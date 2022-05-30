const passport = require("passport");
const { BaseUser } = require("../models/user");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { addToRegularRole } = require("../controllers/regular");
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  const existingUser = await BaseUser.findById(user._id);
  return done(null, existingUser);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "870331288511-q9g9hrh58tarrinlek1f7t1r319m4b5m.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "https://localhost:5000/api/auth/google/callback",
      proxy: true,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      const existingUser = await BaseUser.findOne({ googleId: profile.id });
      if (existingUser) {
        req.isLogin = true;
        return cb(null, existingUser);
      }

      const newUser = new BaseUser({
        name: profile.name.givenName,
        googleId: profile.id,
        email: profile.emails[0]?.value,
        email_verified: true,
        username: profile.displayName.trim().toLowerCase().replace(/\s/g, ""),
      });

      await newUser.save();
      await addToRegularRole(newUser.id);

      return cb(null, newUser);
    }
  )
);
