const Author=require('../models/author');

module.exports={

    create(req,res,next){
        const authorProps=req.body;
        Author.create(authorProps)
        .then(result=>res.status(200).send(result))
        .catch(next);
    },

    edit(req,res,next){
        const id=req.params.id;
        const authorProps=req.body;
        Author.findByIdAndUpdate({_id:id},authorProps)
        .then(result=>res.status(200).send(result))
        .catch(next);
    },

    getUser(req,res,next){
        const id=req.params.id;
        Author.findOne({_id:id}).populate('blogs')
        .then(result=> res.status(200).send(result))
        .catch(next);
    },


    delete(req,res,next){
        const id=req.params.id;
        Author.findByIdAndUpdate({_id:id},{status:false})
        .then(result=> res.status(204).send(result))
        .catch(next);
    },

  

}