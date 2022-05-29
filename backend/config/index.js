require("dotenv").config()

module.exports = {
    MONGO_CONNECTION_STRING: process.env.MONGO_CONNECTION_STRING,
    EMAIL: process.env.EMAIL,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    VERIFICATION_HASH_KEY: process.env.VERIFICATION_HASH_KEY
}