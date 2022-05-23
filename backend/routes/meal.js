const express = require("express");
const { createMeal, getAllPaginatedMeals } = require("../controllers/meal");
const {requireRestaurantOwner} = require("../helpers/roleCheck.js");
const router = express.Router();
const multer = require("multer");
const upload = multer();
router
  .route("/")
  .get(getAllPaginatedMeals)
  .post(upload.none(), createMeal);

module.exports = router;
