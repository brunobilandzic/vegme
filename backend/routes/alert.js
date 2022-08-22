const express = require("express");
const { getAllPaginatedAlerts, readAlerts, getUnreadAlertsCount } = require("../controllers/alerts");
const router = express.Router();
const { requireLogin } = require("../helpers/roleCheck");

router.get("/paginated", requireLogin, getAllPaginatedAlerts);
router.get("/unread", requireLogin, getUnreadAlertsCount)

router.patch("/read", requireLogin, readAlerts);

module.exports = router;
