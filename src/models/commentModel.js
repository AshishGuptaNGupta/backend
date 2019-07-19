const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const CommentSchema=new Schema({
    content:{type:String,required:true},
    user:{ type:Schema.Types.ObjectId,ref:'author',required:true},
    status:{type:Boolean,default:true},
    date:{type:Date,default:Date.now}
});




const commentModel=mongoose.model('comment',CommentSchema);
module.exports=commentModel;