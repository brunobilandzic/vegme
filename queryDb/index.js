const { default: mongoose } = require("mongoose")
require("dotenv").config()
const { checkIfSameMeal } = require("./queries/order")

const main = async () => {
    checkIfSameMeal()
}

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    main()
})