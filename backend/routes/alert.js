const express = require("express");
const router = express.Router();
const { requireLogin } = require("../helpers/roleCheck");

router.get("/", requireLogin, getAllAlerts);
