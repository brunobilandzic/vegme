const mongoose = require("mongoose");
const PassportLocalMongoose = require("passport-local-mongoose")
const roleObject = {
  name: { type: String, required: true },
  id: {type: mongoose.Types.ObjectId}
};
const baseUserObject = {
    name: { type: String, required: true },
    googleId: { type: String },
    //token: String,
    username: { type: String, required: true },
    roles: [roleObject]
    //  email: { type: String, required: true },
    // password:{type: String, required:true}
    // mobile: { type: String, required: true },
    // address: { type: String, required: true },
    // surname: { type: String, required: true },
  };

  
  const customerRoleUserObject = {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
    favouriteRestaurants: [{ type: mongoose.Types.ObjectId, ref: "Restaurant" }],
    orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
  };
  
  const restaurantOwnerRoleUserObject = {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true },
    restaurants:[ { type: mongoose.Types.ObjectId, ref: "Restaurant" }]
  };
  
  const adminRoleUserObject = {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true }
  }

  const operatorRoleUserObject = {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true }
  }
  
const baseUserSchema = new mongoose.Schema(baseUserObject)
baseUserSchema.plugin(PassportLocalMongoose)
const BaseUser = mongoose.model("BaseUser", baseUserSchema)

const CustomerRoleUser = mongoose.model("CustomerRoleUser",new mongoose.Schema(customerRoleUserObject) )
const RestaurantOwnerRoleUser = mongoose.model("RestaurantOwnerRoleUser", new mongoose.Schema(restaurantOwnerRoleUserObject))
const AdminRoleUser = mongoose.model("AdminRoleUser", new mongoose.Schema(adminRoleUserObject))
const OperatorRoleUser = mongoose.model("OperatorRoleUser", new mongoose.Schema(operatorRoleUserObject))

module.exports = {
    BaseUser,
    CustomerRoleUser,
    RestaurantOwnerRoleUser,
    AdminRoleUser,
    OperatorRoleUser
};
