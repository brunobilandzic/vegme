const express = require("express");
const {
  createMeal,
  getAllPaginatedMeals,
  getAllMealsForCook,
  toggleOfferMeal,
  needNewPageMeal,
  getAllPaginatedSpecialMeals,
  getOneMeal,
  offerMeal,
  unofferMeal,
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
router.post("/offer/:mealId", requireCook, offerMeal)
router.post("/unoffer/:mealId", requireCook, unofferMeal)


module.exports = router;
