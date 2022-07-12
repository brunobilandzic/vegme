const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
  createCook,
  getAllCooks,
  getAllCookRoles,
  getAllMealsForCook,
  getCookByUsername,
} = require("../controllers/cook.js");

router.route("/").get(getAllCooks).post(upload.none(), createCook);
router.get("/meals", getAllMealsForCook);
router.get("/roles", getAllCookRoles);
router.get("/one/:username", getCookByUsername);

module.exports = router;
