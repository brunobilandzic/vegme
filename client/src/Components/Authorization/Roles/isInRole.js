const { COOK } = require("../../../Shared/Constants/Roles");

const isInCookRole = (user) => {
  return user?.roles.map((role) => role.name)?.includes(COOK);
};


module.exports= {
    isInCookRole
}