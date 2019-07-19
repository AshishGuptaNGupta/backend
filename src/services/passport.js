const passport=require('passport');
const Author=require('../models/author');
const config=require('../../key');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const LocalStrategy=require('passport-local');


const localOptions={usernameField:'email'};
const localLogin=new LocalStrategy(localOptions,function(email,password,done){

        Author.findOne({email:email},function(err,author){
            if(err){return done(err);}
            if(!author){
                return done(null,false);
            }
            author.comparePassword(password,function(err,isMatch){
                if(err){return done(err);}
                if(!isMatch){
                    return done(null,false); 
                }
                else{
               
                    return done(null,author);
                }
            });
        });
});


const jwtOptions={
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:config.key
};

const jwtLogin=new JwtStrategy(jwtOptions,function(payload,done){
    console.log(payload);
    Author.findById(payload.sub,function(err,author){
        if(err)
        return done(err,false);

        if(author){
           
            return done(null,author);
        }else{
            done(null,false);
        }
    });
});

passport.use(jwtLogin);
passport.use(localLogin);


const requireAuth=passport.authenticate('jwt',{session:false});
const checkCred=passport.authenticate('local',{session:false});

module.exports={
    requireAuth:requireAuth,
    checkCred:checkCred
};
