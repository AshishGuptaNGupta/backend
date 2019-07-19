const mongoose=require('mongoose');
const Credential=require('../models/credentials');
const jwt=require('jsonwebtoken');
const Author=require('../models/author');
const key=require('../../key');

function genToken(user){
    const timeStamp=new Date().getTime();
    return jwt.sign({sub:user._id,iat:timeStamp},key.key);
}

module.exports={
    
    // test(req,res,next){
    //     return res.send({token:genToken("hello")});
    // },
    // test1(req,res,next){
    //     return res.send({hi:"hello"});
    // },

    signin(req,res,next){
        Author.findOne({email:req.body.email})
        .then(author=>{
            blogCount=author.blog_count;
            author=JSON.parse(JSON.stringify(author));
            author.token=genToken(author);
            author.blog_count=blogCount;
            res.send(author);
            
        })
 
        
        
        
    },
    create(req,res,next){
        const credProps=req.body;
        const author=new Author(credProps);
        credProps.user=author;
        const credential=new Credential(credProps);
        Credential.findOne({email:credProps.email},function(err,existingUser){
            if(err){return next(err);}
            if(existingUser){
                return res.status(422).send({error:"Email already in use"});
            }
            else{
                Promise.all([author.save(),credential.save()])
                .then(result=>{
                    result=JSON.parse(JSON.stringify(result[0]));
                    result.token=genToken(author);
                   return  res.status(200).send(result);
                })
                .catch(next);
            }
        });
        
    }
}