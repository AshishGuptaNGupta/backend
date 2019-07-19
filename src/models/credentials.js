const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt');



const CredentialSchema= new Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    user:{   
        type: Schema.Types.ObjectId,
        ref:'author',
        required:true
    }
});

CredentialSchema.pre('save',function(next){
    const user=this;
    console.log(user);
    bcrypt.genSalt(10,(err,salt)=>{
        if(err) 
        return next(err);
        bcrypt.hash(user.password,salt,(err,hash)=>{
            if(err)
            return next(err);

            user.password=hash;
             next();

        });
    });
});


const CredentialModel=mongoose.model('credential',CredentialSchema);

module.exports=CredentialModel;