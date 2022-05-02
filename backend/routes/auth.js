const passport = require("passport");
const multer = require("multer");
const express = require("express");
const { Customer, BaseUser } = require("../models/user");
const { requireLogin } = require("../helpers/roleCheck");
const { createNewUser } = require("../controllers/user");
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
    console.log("in c2");
    console.log(req.user);
    res.send("Thank you for signin in!");
  }
);

router.post("/local", upload.none(), createNewUser, (req, res) => {
  passport.authenticate("local")(req, res, () => {
    console.log(newCustomer);
    return res.status(201).json({ msg: "msg" });
  });
});

router.get("/test", requireLogin, (req, res) => {
  res.json(req.user);
  console.log(req.user.id);
});

module.exports = router;
