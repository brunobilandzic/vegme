const mongoose = require("mongoose");


const mealCategories = {
  MAIN: "MAIN",
  DESSERT: "DESSERT",
  APPETIZER: "APPETIZER",
  DRINK: "DRINK",
};


const mealTypes = {
  REGULAR: "REGULAR",
  SPECIAL: "SPECIAL",
};


const mealObject = {
  name: { type: String },
  ingredients: [
    { name: { type: String }, allergen: { type: Boolean, default: false } },
  ],
  is_offered: { type: Boolean, default: false },
  orders: [{ type: mongoose.Types.ObjectId, ref: "Order" }],
  cook: { type: mongoose.Types.ObjectId, ref: "CookRoleUser" },
  category: {
    type: String,
    enum: Object.values(mealCategories),
    default: mealCategories.MAIN,
  },
  type: {
    type: String,
    enum: Object.values(mealTypes),
    default: mealTypes.REGULAR,
  },
  date_created: { type: Date, default: () => Date.now() },
  offered_dates: [{type: Number}]
};


const mealSchema = new mongoose.Schema(mealObject);
const Meal = mongoose.model("Meal", mealSchema);


module.exports = { Meal, mealTypes };
