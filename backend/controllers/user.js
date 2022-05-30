const { PaginatedList } = require("../helpers/pagination.js");
const { BaseUser } = require("../models/user.js");
const passport = require("passport");
const { addToRegularRole } = require("./regular.js");
const { sendVerificationMail } = require("../helpers/mail.js");
const HttpError = require("../errors/http-error.js");
const { compareHashes } = require("../helpers/hashing.js");

const getAllUsers = async (req, res) => {
  const usersWithPagination = await PaginatedList.getPaginatedResult(
    BaseUser.find()
  );

  res.json(usersWithPagination);
};

const createNewUser = async (req, res, next) => {
  let user;
  try {
    user = await BaseUser.register(req.body, req.body.password);
    sendVerificationMail(req.protocol, req.hostname, user);
  } catch (error) {
    return next(
      new HttpError(
        error.message === "undefined"
          ? "User with that username already exists."
          : error.message,
        400
      )
    );
  }

  await addToRegularRole(user.id);

  passport.authenticate("local")(req, res, () => {
    return res.json(user);
  });
};

const checkVerificationLink = async (req, res, next) => {
  const user = await BaseUser.findOne({ username: req.params.username });
  compareHashes(user, req.params.verification_hash)
    ? (user.email_verified = true)
    : (user.email_verified = false);

  await user.save();
  res.json({ verified: user.email_verified });
};

const createNewUserManually = async (newUser) => {
  let user = await BaseUser.register(newUser, newUser.password);
  return user.id;
};

const updateUsername = async (req, res, next) => {
  const user = await BaseUser.findById(req.user.id);
  if (!user) return next(new HttpError("That user does not exist.", 404));

  user.username = req.body.username;
  user.changed_username = true;
  
  await user.save();
  res.json(user);
};

module.exports = {
  getAllUsers,
  createNewUser,
  createNewUserManually,
  checkVerificationLink,
  updateUsername,
};
