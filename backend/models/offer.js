const mongoose = require("mongoose")

const offerObject = {
    remark: { type: String },
    offered_by: { type: mongoose.Types.ObjectId, ref: "RegularRole", required: true},
    meals: [{ type: mongoose.Types.ObjectId, ref: "Meal"}],
    is_available: {type: Boolean, default: true}
}

const Offer = new mongoose.model("Offer", new mongoose.Schema(offerObject))

module.exports = {Offer}