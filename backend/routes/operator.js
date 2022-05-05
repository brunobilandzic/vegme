const express = require("express")
const { createNewOperator } = require("../controllers/operator")
const router = express.Router()
const multer = require("multer")
const upload = multer()

router.route("/")
    .post(upload.none(),createNewOperator)

module.exports = router