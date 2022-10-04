const { default: mongoose } = require("mongoose")
const { queryFavourited } = require("./queries/meal")
require("dotenv").config()
const { checkIfSameMeal } = require("./queries/order")

const main = async () => {
    queryFavourited()
}

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    console.log(("Process started"));
    main()
})