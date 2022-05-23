const passport = require("passport");
const { BaseUser } = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {CUSTOMER} = require("../constants/roles.js");
const { addToCustomerRole } = require("../controllers/regular");
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const existingUser = await BaseUser.findById(user._id)
  return done(null, existingUser)
});

passport.use(new GoogleStrategy({
    clientID: "870331288511-q9g9hrh58tarrinlek1f7t1r319m4b5m.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback",
    proxy: true,
  },
  async (req,  accessToken, refreshToken, profile, cb) => {
    const existingUser = await BaseUser.findOne({googleId: profile.id})
    if(existingUser) return cb(null,existingUser)

    const newUser = new BaseUser({
      name: profile.name.givenName,
      googleId: profile.id,
      username: profile.displayName.trim()
    })

    await newUser.save()
    await addToCustomerRole(newUser.id)

    return cb(null,newUser)
  }
));
