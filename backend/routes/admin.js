const express = require("express")
const router = express.Router()
const {getAllAdmins, createAdmin, getAllAdminRoles} = require("../controllers/admin.js")
router.route("/")
    .get(getAllAdmins)
    .post(createAdmin)

router.get("/roles", getAllAdminRoles)

module.exports = router