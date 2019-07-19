const app=require('./src/app');

app.listen(process.env.PORT||8080,()=>{
    console.log("Listening to port 3050");
});