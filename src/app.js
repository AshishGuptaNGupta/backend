const express=require('express');
const mongoose=require('mongoose');
const app=express();
const bodyParser=require('body-parser');
const routes=require('./routes/routes');
const authRoutes=require('./routes/authRoutes');
const cors=require('cors');

mongoose.connect("mongodb+srv://ashishguptangupta25:leomeo145@cluster0-0elfi.gcp.mongodb.net/blog",{useNewUrlParser:true,useFindAndModify:false});
mongoose.connection
  .once('open',()=>{
    console.log("Connected to mongoose");
   
  })
  .on('error',(error)=>{
    console.warn("Error",error);
  });

app.use(cors());
app.use(bodyParser.json());

authRoutes(app);
routes(app);



app.use((err,req,res,next)=>{
  res.status(422).send({err:err.message});
});




module.exports=app;
