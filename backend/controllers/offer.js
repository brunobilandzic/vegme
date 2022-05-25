const { Offer } = require("../models/offer");
const { RegularRoleUser } = require("../models/user.js");
const { Meal } = require("../models/meal.js");

const createOffer = async (req, res) => {
  const newOffer = new Offer(req.body);
  req.body.meals?.forEach(async (mealId) => {
    const meal = await Meal.findById(mealId);
    meal.offers.push(newOffer.id);
    await meal.save();
  });
  const offerer = await RegularRoleUser.findOne({ user: req.user.id });
  newOffer.offered_by = offerer.id;
  offerer.offers.push(newOffer.id);

  await offerer.save();
  await newOffer.save();

  res.json(newOffer)
};

const getAllOffers = async (req, res, next) => {
  const allOffers = await Offer.find();
  res.json(allOffers);
};

module.exports = {
  createOffer,
  getAllOffers,
};
