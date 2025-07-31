const User = require("../model/user.model");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use(new LocalStrategy(
   async (username, password, done) => {
      try {
         const user = await User.findOne({ username: username });
         if (!user) {
            return done(null, false, { message: "Incorrect username" });
         }

         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) {
            return done(null, false, { message: "Incorrect password" });
         }

         return done(null, user);
      } catch (error) {
         return done(error);
      }
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
