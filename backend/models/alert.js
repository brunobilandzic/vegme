const { default: mongoose } = require("mongoose");

const alertObject = {
  user: mongoose.Types.ObjectId,
  text: { type: String, default: "" },
  date: { type: Date, default: () => Date.now() },
  read: { type: Boolean, default: false },
};

const Alert = new mongoose.model(
  "Alert",
  new mongoose.Schema(alertObject)
);

module.exports = { Alert };
