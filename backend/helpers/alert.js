const { Alert } = require("../models/alert");
const { BaseUser } = require("../models/user");

const sendAlert = async (model, alertText, toAlertId, io) => {
  const baseUser = await getBaseUser(model, toAlertId);

  const newAlert = new Alert({
    user: baseUser.id,
    text: alertText,
  });

  baseUser.alerts.push(newAlert.id);

  await newAlert.save();
  await baseUser.save();

  const cookSocketId = io.onlineUsers?.find(
    (ou) => ou.id === baseUser.id.toString()
  )?.socketId;

  if (cookSocketId) {
    io.to(cookSocketId).emit("new-alert", newAlert);
  }
};

const getBaseUser = async (model, userRoleId) => {
  const userRole = await model.findById(userRoleId);
  const baseUser = await BaseUser.findById(userRole.user);
  return baseUser;
};

module.exports = {
  sendAlert,
  getBaseUser,
};
