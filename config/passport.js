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
        if(!bcrypt.compare(password, user.password )){
            return done(null, false, {message: "incorrect password"})
        }

        return done(null, user);
    } catch (error) {

        return done(err);
    }
    

   
  }
));

//create session id
 passport.serializeUser((user,done)=>{
    done(null, user.id)
 })

 passport.deserializeUser(async (id, done)=>{
    try {
        const user= await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error, false)
    }
 })