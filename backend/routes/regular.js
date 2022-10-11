const express = require("express");
const multer = require("multer");
const upload = multer();
const {
  getAllRegularUsers,
  createRegular,
  getRegularByUsername,
  getFavourites,
} = require("../controllers/regular");
const router = express.Router();

router.get("/", getAllRegularUsers);
router.post("/", upload.none(), createRegular);
router.get("/username/:username", getRegularByUsername);
router.get("/favourites/:username", getFavourites);

module.exports = router;
