const mongoose=require('mongoose');
const {AuthorModel}=require('./author');
const Schema = mongoose.Schema;
const comment=require('./commentModel');

 const BlogSchema= new Schema(
    {
    title:{type:String,required:true},
    tags:[String],
    body:{
        type:String,
        min:[300,"Body too short"],
        required:true
    },
    date:{ type:Date,default:Date.now},
    likes:{ type:Number,default:0},
    author:{type:Schema.Types.ObjectId,ref:'author',required:true},
    comments:[{
        type: Schema.Types.ObjectId,
        ref:'comment'
    }],
    status:{type:Boolean,default:true}
    }
);

BlogSchema.post('save',function(next){
    const Author=mongoose.model('author');
    Author.findByIdAndUpdate({_id:this.author},{$push:{blogs:this._id}})
    .then(()=>next());
});


const BlogModel=mongoose.model("blog",BlogSchema);




module.exports=BlogModel;