const express = require("express")
const multer = require("multer")
const { createNewUser, getAllUsers } = require("../controllers/user")
const router = express.Router()

const upload = multer()

router.route("/")
    .get(getAllUsers)
    .post(upload.none(), createNewUser)

module.exports = router