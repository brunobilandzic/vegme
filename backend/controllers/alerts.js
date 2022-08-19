const { Alert } = require("../models/alert");

const getAllAlerts = async (req, res) => {
  const allAlerts = await Alert.find({ user: req.user.id }).sort({date: -1});
  res.json(allAlerts);
};

const readAlerts = async (req, res) => {
  const result = await Alert.updateMany(
    {
      _id: {
        $in: req.body.alertIds,
      },
    },
    { read: false }
  );
  res.json({ modifiedCount: result.modifiedCount });
};

module.exports = {
  getAllAlerts,
  readAlerts,
};
