const express = require("express");
const multer = require("multer")
const {
  createRestaurant,
  getAllRestaurants,
} = require("../controllers/restaurant");
const { requireLogin, requireRestaurantOwner } = require("../helpers/roleCheck");

const router = express.Router();
const upload = multer()

router
  .route("/")
  .get(getAllRestaurants)
  .post(requireLogin, requireRestaurantOwner, upload.none(), createRestaurant);

module.exports = router;
