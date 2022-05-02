const express = require("express");
const multer = require("multer")
const upload = multer()
const { getAllCustomers, createCustomer } = require("../controllers/customer");
const { requireLogin, requireAdministrator } = require("../helpers/roleCheck");
const router = express.Router();

router.get("/", getAllCustomers)
router.post("/", upload.none(), createCustomer)

module.exports = router;
