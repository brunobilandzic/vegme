const express = require("express");
const { getAllPaginatedAlerts, readAlerts } = require("../controllers/alerts");
const router = express.Router();
const { requireLogin } = require("../helpers/roleCheck");

router.get("/paginated", requireLogin, getAllPaginatedAlerts);

router.patch("/read", requireLogin, readAlerts);

module.exports = router;
