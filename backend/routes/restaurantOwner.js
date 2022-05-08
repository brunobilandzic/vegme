const express = require("express");
const multer = require("multer")
const upload = multer()
const { createRestaurantOwner, getAllRestaurantOwners } = require("../controllers/restaurantOwner.js");
const { requireAdministrator } = require("../helpers/roleCheck.js");

const router = express.Router()

router.route("/")
    .get( getAllRestaurantOwners)
    .post(  upload.none(), createRestaurantOwner)

module.exports = router