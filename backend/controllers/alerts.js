const { Alert } = require("../models/alert")

const getAllAlerts = (req, res) => {
    const allAlerts = await Alert.find({user: req.user.id})
    res.json(allAlerts)
}

module.exports = {
    getAllAlerts
}