const express = require("express");
const multer = require("multer")
const {
  createRestaurant,
  getAllRestaurants,
  getAllPaginatedRestaurants,
} = require("../controllers/restaurant");
const { requireLogin, requireRestaurantOwner } = require("../helpers/roleCheck");

const router = express.Router();
const upload = multer()

router
  .route("/")
  .get(getAllPaginatedRestaurants)
  .post(requireLogin, requireRestaurantOwner, upload.none(), createRestaurant);


router.route("/all").get(getAllRestaurants)


module.exports = router;
