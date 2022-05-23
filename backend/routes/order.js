const express = require("express");
const { requireLogin, requireCustomer } = require("../helpers/roleCheck");
const multer = require("multer");
const { createOrder, getAllOrders } = require("../controllers/order");
const upload = multer()
const router = express.Router()

router.route("/")
    .get(getAllOrders)
    .post(upload.none(), createOrder)

module.exports = router