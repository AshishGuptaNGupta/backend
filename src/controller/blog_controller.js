const Blog=require('../models/blogSchema');
const mongoose=require('mongoose');



module.exports={
    test(req,res){
        res.send({hi:"there"});
      },


    create(req,res,next){
        const blogProps=req.body;
        blogProps.author=mongoose.Types.ObjectId(blogProps.author);
        const blog=new Blog(blogProps);
        blog.save()
        .then(blog=>res.status(200).send(blog))
        .catch(next);
    },

    delete(req,res,next){
    const id=req.params.id;
    Blog.findByIdAndUpdate({_id:id},{status:false})
    .then((result)=>{
        res.status(204).send(result);
    })
    .catch(next);
    },

    edit(req,res,next){
        const id=req.params.id;
        const blogProps=req.body;
        Blog.findByIdAndUpdate({_id:id},blogProps)
        .then(result=>res.status(200).send(result))
        .catch(next);
    
    },

    getBlog(req,res,next){
        const id=req.params.id;
        Blog.findOne({_id:id}).populate('author').populate({path:'comments',populate:{path:'user'}})
        .then(result=>  res.status(200).send(result))
        .catch(next);
    },
    
    getFeatured(req,res,next){
        let page,limit,sort;
   
         page=req.body.page-1;
          limit=req.body.limit;
          sort={
            [req.body.sort.criteria]:req.body.sort.order
          }
        Blog.find().skip(page*limit).limit(limit).sort(sort)
        .then(result=> res.status(200).send(result))
        .catch(next);
    },

    getAuthorBlogs(req,res,next){
        let page,limit,sort;
   
         page=req.body.page-1;
          limit=req.body.limit;
          sort={
            [req.body.sort.criteria]:req.body.sort.order
        };
        

        Blog.find({author:req.params.id}).skip(page*limit).limit(limit).sort(sort)
        .then(result=>res.status(200).send(result))
        .catch(next);
    },
    searchBlog(req,res,next){
        const term=req.query.term;
        Blog.find({$text:{$search:term}})
        .then(result=>res.send(result))
        .catch(next);
    }
}