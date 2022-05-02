const passport = require("passport")
const { BaseUser } = require("../models/user")

passport.use(BaseUser.createStrategy())

passport.serializeUser(BaseUser.serializeUser())
passport.deserializeUser(BaseUser.deserializeUser())