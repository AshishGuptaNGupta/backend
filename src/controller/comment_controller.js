const Comment=require('../models/commentModel');
const Blog=require('../models/blogSchema');
const mongoose=require('mongoose');

module.exports={
    
    create(req,res,next){
        const id=req.params.id;
        const commentProps=req.body;
        commentProps.user=mongoose.Types.ObjectId(commentProps.user);
        Comment.create(commentProps)
        .then((result)=>{
            Blog.findByIdAndUpdate({_id:id},{$push:{comments:result._id}})
            .then(()=>res.status(200).send(result))
            .catch(next);
        })
        .catch(next);
     
    },

    edit(req,res,next){
        const id=mongoose.Types.ObjectId(req.params.id);    
        Comment.findByIdAndUpdate({_id:id},{content:req.body.content})
        .then(result=>{
            result.content=req.body.content;
             return res.status(200).send(result)
            }
            )
        .catch(next);
    },

    delete(req,res,next){
        console.log(req.query);
        Promise.all([Comment.findByIdAndUpdate({_id:req.query.comment_id},{status:false}),
            Blog.findByIdAndUpdate({_id:req.query.blog_id},{$pull:{comments:req.query.comment_id}})])
            .then(result=>res.send({status:"success",id:req.query.comment_id}))
            .catch(next);
        
      
    },

    getComment(req,res,next){
        const id=req.params.id;
        Comment.findById({_id:id})
        .then(result=>res.status(200).send(result))
        .catch(next);
    }
}