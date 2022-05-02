const express = require("express");
const { createRestaurant, getAllRestaurants } = require("../controllers/restaurant");
const { requireLogin, requireAdministrator } = require("../helpers/roleCheck");

const router = express.Router()

router.route("/")
    .get(getAllRestaurants)
    .post(requireLogin, requireAdministrator, createRestaurant)

module.exports = router