const express = require("express")
const multer = require("multer")
const { createNewUser, getAllUsers, checkVerificationLink, updateUsername } = require("../controllers/user")
const router = express.Router()

const upload = multer()

router.route("/")
    .get(getAllUsers)
    .post(upload.none(), createNewUser)

router.get("/verify/:username/:verification_hash", checkVerificationLink)

router.post("/username/new",upload.none(), updateUsername)

module.exports = router