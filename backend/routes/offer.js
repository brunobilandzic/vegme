const express = require("express")
const router = express.Router()

const {getAllOffers, createOffer} = require("../controllers/offer.js")

router.route("/")
    .get(getAllOffers)
    .post(createOffer)

module.exports = router