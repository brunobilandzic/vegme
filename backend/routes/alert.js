const express = require("express");
const { getAllAlerts } = require("../controllers/alerts");
const router = express.Router();
const { requireLogin } = require("../helpers/roleCheck");

router.get("/", requireLogin, getAllAlerts);

module.exports = router
