const Draft=require('../models/draftSchema');
const mongoose=require('mongoose');


module.exports={

    create(req,res,next){
        const draftProps=req.body;
        console.log(draftProps);
        draftProps.author=mongoose.Types.ObjectId(draftProps.author);
        const draft=new Draft(draftProps);
        draft.save()
        .then(draft=>res.status(200).send(draft))
        .catch(next);
    },

    delete(req,res,next){
        Draft.findByIdAndDelete({_id:req.params.id})
        .then(result=>res.send({status:"success",id:req.params.id}))
        .catch(next);
    
    },

    edit(req,res,next){
        const draftProps=req.body;
        console.log(draftProps);
        Draft.findByIdAndUpdate({_id:req.params.id},draftProps)
        .then((result)=>{
            result=JSON.parse((JSON.stringify(result)));
            result.body=req.body.body;
            result.title=req.body.title;
            res.status(200).send(result);
        })
        .catch(next);
    
    },

    getAll(req,res,next){
        
        let page,limit,sort;
   
         page=req.body.page-1;
          limit=req.body.limit;
          sort={
            [req.body.sort.criteria]:req.body.sort.order
        };
    
        Draft.find({author:req.params.id}).skip(page*limit).limit(limit).sort(sort)
        .then((result)=>res.status(200).send(result))
        .catch(next);
    
    },

    get(req,res,next){
        console.log("run");
        Draft.findById({_id:req.params.id})
        .then((result)=>res.status(200).send(result))
        .catch(next);
    }


}