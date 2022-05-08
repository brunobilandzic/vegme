const express = require("express");
const { getAllMeals, createMeal } = require("../controllers/meal");
const {requireRestaurantOwner} = require("../helpers/roleCheck.js");
const router = express.Router();
const multer = require("multer");
const upload = multer();
router
  .route("/")
  .get(getAllMeals)
  .post(requireRestaurantOwner, upload.none(), createMeal);

module.exports = router;
