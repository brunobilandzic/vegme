const passport = require("passport");
const { BaseUser } = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser((user, done) => {
  console.log("serialize", user)
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  console.log("dseserialite", id)
  const user = await BaseUser.findById(id)
  return done(null, user)
});

passport.use(new GoogleStrategy({
    clientID: "870331288511-q9g9hrh58tarrinlek1f7t1r319m4b5m.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback",
    proxy: true,
  },
  async (req,  accessToken, refreshToken, profile, cb) => {
    console.log("in c1")
    console.log("in def callback", profile)
    const existingUser = await BaseUser.findOne({googleId: profile.id})
    if(existingUser) return cb(null,existingUser)
console.log(profile.displayName)
    const newUser = new BaseUser({
      name: profile.name.givenName,
      googleId: profile.id,
      username: profile.displayName.trim()
    })

    await newUser.save()

    return cb(null,newUser)
  }
));
