const CredentialController= require('../controller/credentials_controller');
const middleware=require("../services/passport");


module.exports=(app)=>{
    app.post('/signup',CredentialController.create);
    app.post( '/signin',middleware.checkCred, CredentialController.signin);
}