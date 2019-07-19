const mongoose=require('mongoose');
const {AuthorModel}=require('./author');
const Schema = mongoose.Schema;
const comment=require('./commentModel');

 const DraftSchema= new Schema(
    {
    title:{type:String},
    tags:[String],
    body:{
        type:String,
        min:[300,"Body too short"]
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




const DraftModel=mongoose.model("draft",DraftSchema);




module.exports=DraftModel;