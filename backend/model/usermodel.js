const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    dob: Date,
    code: String,
    phone: Number
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}