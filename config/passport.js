const User = require("../model/user.model");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
require("dotenv").config()
// passport.use(new LocalStrategy(
//    async (username, password, done) => {
//       try {
//          const user = await User.findOne({ username: username });
//          if (!user) {
//             return done(null, false, { message: "Incorrect username" });
//          }

//          const isMatch = await bcrypt.compare(password, user.password);
//          if (!isMatch) {
//             return done(null, false, { message: "Incorrect password" });
//          }

//          return done(null, user);
//       } catch (error) {
//          return done(error);
//       }
//    }
// ));
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ googleId: profile.id}, (err,user)=>{
      if(err) return cb (err, null)

         if(!user){
            let newUser= new User({
               googleId: profile.id,
               username: profile.displayName
            })
            newUser.save()
            return cb(null, newUser)
         }
         else{
            return cb(null, user)
         }
    })
   
  }
));
// Serialize user
passport.serializeUser((user, done) => {
   done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
   try {
      const user = await User.findById(id);
      done(null, user);
   } catch (error) {
      done(error, false);
   }
});
