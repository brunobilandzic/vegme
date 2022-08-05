const { default: mongoose } = require("mongoose")
require("dotenv").config()
const { checkIfSameMeal } = require("./queries/order")

const main = async () => {
    let will = undefined
}

mongoose.connect(process.env.MONGO_CONNECTION_STRING).then(() => {
    console.log(("Process started"));
    main()
})