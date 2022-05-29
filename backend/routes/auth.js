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
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "https://localhost:3000/auth/failure",
    successRedirect: "https://localhost:3000/auth/success",
  }),
  (req, res) => {
    res.send("Thank you for signin in!");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.json({ logout: true });
});

router.post("/local/signup", upload.none(), createNewUser);

router.post("/local/login", upload.none(), async (req, res, next) => {
  req.body.email = req.body.credentials;
  req.body.username = req.body.credentials;
  const user = await BaseUser.findOne({
    $or: [{ username: req.body.credentials }, { email: req.body.credentials }],
  });
  if (!user)
    return next(new HttpError("User with that credentials does not exist."));
  passport.authenticate("local", { failureRedirect: "/api/auth/loginfail" })(
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

router.get("/getuser", (req, res) => {
  res.json(req.user);
});

module.exports = router;
