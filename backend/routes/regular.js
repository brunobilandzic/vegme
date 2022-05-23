const express = require("express");
const multer = require("multer")
const upload = multer()
const { getAllRegularUsers, createRegular } = require("../controllers/regular");
const router = express.Router();

router.get("/", getAllRegularUsers)
router.post("/", upload.none(), createRegular)

module.exports = router;
