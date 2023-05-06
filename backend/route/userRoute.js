const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userRoute = express.Router()
userRoute.use(express.json())


const { UserModel } = require("../model/usermodel")


userRoute.get("/", async (req, res) => {
    try {
        const data = await UserModel.find()
        res.status(200).send({ "Users": data })
    }
    catch (err) {
        res.send({ "error": err })
    }
})


userRoute.post("/register", async (req, res) => {
    const { name, email, password, dob, phone, code } = req.body
    const userFound = await UserModel.findOne({ email })
    if (userFound) {
        res.send({ "message": "User Already Registered" })
    }
    else {
        try {
            bcrypt.hash(password, 5, async function (err, hash) {
                const data = new UserModel({ name, email, password: hash, dob, phone, code })
                await data.save()

                res.status(201).send({ "message": "User registered" })
            });
        }
        catch (err) {
            res.send({ "error": err })
        }
    }

})


userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    const data = await UserModel.findOne({ email });
    if (data) {
        try {
            bcrypt.compare(password, data.password, function (err, result) {
                if (result) {
                    let token = jwt.sign({ userID: data._id }, process.env.key);
                    res.send({ "message": "Validation done", "token": token })
                }
                else {
                    res.send({ "message": "Incorrect Credentials" })
                }
            });
        }
        catch (err) {
            res.send({ "error": "Incorrect Credentials" })
        }
    }
    else {
        res.send({ "error": "No such user found" })
    }

})



module.exports = {
    userRoute
}
