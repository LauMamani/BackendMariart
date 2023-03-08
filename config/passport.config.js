import passport from "passport";
import { Strategy } from "passport-local";
import { Users } from "../config/user.config.js"
import hasPassword from "../helpers/hasPass.helper.js";
import validatePass from "../helpers/validatePass.helper.js";

 passport.use(
    "signup",
    new Strategy({ usernameField: "email", passReqToCallback: true }, (req, email, password, done) => {
      const { name } = req.body;
      const { address } = req.body;
      const { phone } = req.body;
      Users.findOne({ email }, (err, user) => {
        if (user) return done(null, false);
        Users.create(
          {
            email,
            password: hasPassword(password),
            name,
            address,
            phone,
          },
          (err, user) => {
            if (err) return done(err);
            return done(null, user);
          }
        );
      });
    })
);
passport.use(
    "login",
    new Strategy({usernameField: "email"}, (email, password, done) => {
      Users.findOne({ email }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        if (!validatePass(password, user.password)) return done(null, false);
        return done(null, user);
      });
    })
);
  
passport.serializeUser((userObj, done) => {
    done(null, userObj._id);
});
  
passport.deserializeUser((id, done) => {
    Users.findById(id, done);
});

export default passport