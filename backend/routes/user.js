const express = require("express");
const multer = require("multer");
const { getAllRegularUsers } = require("../controllers/regular");
const {
  createNewUser,
  getAllPaginatedUsers,
  checkVerificationLink,
  updateUsername,
  getRegular,
  getUser,
} = require("../controllers/user");
const router = express.Router();

const upload = multer();

router.post("/", upload.none(), createNewUser);

router.get("/paginated", getAllPaginatedUsers)
router.get("/regular", getAllRegularUsers)

router.get("/verify/:username/:verification_hash", checkVerificationLink);

router.get("/regular/:regularId", getRegular);
router.get("/single/:userId", getUser);

router.post("/username/new", upload.none(), updateUsername);

module.exports = router;
