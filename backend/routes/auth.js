const passport = require("passport");
const multer = require("multer");
const express = require("express");
const { Customer, BaseUser } = require("../models/user");
const { requireLogin } = require("../helpers/roleCheck");
const { createNewUser } = require("../controllers/user");
const HttpError = require("../errors/http-error");
const router = express.Router();
const upload = multer();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/auth/failure",
    successRedirect: "http://localhost:3000/auth/success",
  }),
  (req, res) => {
    res.send("Thank you for signin in!");
  }
);

router.get("/logout", (req, res) => {
  console.log("in logout")
  console.log(req.logout)
  req.logout()
  res.send("logout")
})

router.post("/local/signup", upload.none(), createNewUser);

router.post("/local/login", upload.none(), async (req, res, next) => {
  console.log(req.body)
  const user = await BaseUser.findOne({username: req.body.username})
  if(!user) return  next(new HttpError("User with that username does not exist."))
  passport.authenticate("local", { failureRedirect: "/auth/loginfail" })(
    req,
    res,
    () => {
      res.json({ message: "success" });
    }
  );
});

router.get("/loginfail", (req, res, next) => {
  return next(new HttpError("Password incorrect"));
});

router.get("/test", requireLogin, (req, res) => {
  res.json(req.user);
  console.log(req.user.id);
});

module.exports = router;
