const express = require("express");
const { createMeal, getAllPaginatedMeals, getAllMealsForCook, toggleOfferMeal } = require("../controllers/meal");
const router = express.Router();
const multer = require("multer");
const { requireLogin, requireCook } = require("../helpers/roleCheck");
const upload = multer();
router
  .route("/")
  .get(getAllPaginatedMeals)
  .post(requireLogin, requireCook, upload.none(), createMeal);

router.get("/cook/:cook", getAllMealsForCook)

router.post("/toggleoffer/:meal", toggleOfferMeal)

module.exports = router;
