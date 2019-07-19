const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt');


const AuthorSchema= new Schema(
    {
    name:{type:String,min:[2,"Name too short"],required:true},
    email:{type:String,required:true},
    phone:Number,
    bio:String,
    date_of_joining:{ type:Date,default:Date.now},
    blogs:[{type:Schema.Types.ObjectId,ref:'blog'}],
    status:{type:Boolean,default:true}
    }
);

AuthorSchema.methods.comparePassword=function(candidatePassword,callback){
    const Credential=mongoose.model('credential');
    
    Credential.findOne({email:this.email})
    .then((cred)=>{
        bcrypt.compare(candidatePassword,cred.password,function(err,isMatch){
            if(err){return callback(err);}
            callback(null,isMatch);
        });
    });
   
}
AuthorSchema.virtual('blog_count').get(
    function(){return this.blogs.length}
    );





const AuthorModel=mongoose.model("author",AuthorSchema);

module.exports=AuthorModel;