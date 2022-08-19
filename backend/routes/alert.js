const express = require("express");
const { getAllAlerts, readAlerts } = require("../controllers/alerts");
const router = express.Router();
const { requireLogin } = require("../helpers/roleCheck");

router.get("/", requireLogin, getAllAlerts);

router.patch("/read", requireLogin, readAlerts);

module.exports = router;
