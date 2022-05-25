const mongoose = require("mongoose");
const HttpError = require("../errors/http-error");
const { Offer } = require("../models/offer");
const { RegularRoleUser } = require("../models/user.js");
const { Meal } = require("../models/meal.js");

const createOffer = async (req, res, next) => {
    console.log(req.body)
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    const newOffer = new Offer(req.body);
    req.body.meals?.forEach(async (mealId) => {
      const meal = await Meal.findById(mealId);
      meal.offers.push(newOffer.id);
      await meal.save({ session: sess });
    });
    const offerer = await RegularRoleUser.findOne({ user: req.user.id });
    console.log(offerer, "1")
    newOffer.offered_by = offerer.id;
    console.log(newOffer, "2")
    offerer.offers.push(newOffer.id);
    console.log(offerer, "3")

    await offerer.save({ session: sess });
    console.log("12")
    await newOffer.save({ session: sess });
    console.log("13")
    await sess.commitTransaction();
  } catch (error) {
    return next(new HttpError("Cannot create offer."));
  }
};

const getAllOffers = async (req, res, next) => {
  const allOffers = await Offer.find();
  res.json(allOffers);
};

module.exports = {
  createOffer,
  getAllOffers,
};
