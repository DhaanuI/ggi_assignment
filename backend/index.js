const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

const { connection } = require("./config/db")

const { userRoute } = require("./route/userRoute")
const { authenticate } = require("./middleware/authenticate.middleware")
const { todoRoute } = require("./route/todoRoute")

app.get("/", (req, res) => {
    res.send("Welcome to Backend")
})

app.use("/users", userRoute)
app.use(authenticate)
app.use("/todos", todoRoute)

app.listen(process.env.port, async (req, res) => {
    try {
        await connection;
        console.log("DB is connected")
    }
    catch (err) {
        console.log("DB is not connected", err)
    }

    console.log("Listening to server at port 4500")
})