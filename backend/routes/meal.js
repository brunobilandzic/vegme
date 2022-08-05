const express = require("express");
const {
  createMeal,
  getAllPaginatedMeals,
  getAllMealsForCook,
  toggleOfferMeal,
  needNewPageMeal,
  getAllPaginatedSpecialMeals,
  getOneMeal,
} = require("../controllers/meal");
const router = express.Router();
const multer = require("multer");
const { requireCook } = require("../helpers/roleCheck");
const upload = multer();
router
  .route("/")
  .get(getAllPaginatedMeals)
  .post(requireCook, upload.none(), createMeal);

router.get("/cook/:cook", getAllMealsForCook);
router.get("/special", getAllPaginatedSpecialMeals);
router.get("/neednew/:pageSize", needNewPageMeal);
router.post("/toggleoffer/:meal", toggleOfferMeal);
router.get("/single/:mealId", getOneMeal);

module.exports = router;
