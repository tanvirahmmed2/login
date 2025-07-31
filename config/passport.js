const User= require("../model/user.model")
const passport= require("passport")
const LocalStrategy= require("passport-local").Strategy
const bcrypt= require("bcrypt")



passport.use(new LocalStrategy(
   async (username, password, done)=> {
    try {
        const user= User.findOne({ username: username });
        if(!user){
            return done(null, false, {message: "incorrect username"})
        }
        if(!bcrypt.compare(password, ))

        return done(null, user);
    } catch (error) {

        return done(err);
    }
    

   
  }
));