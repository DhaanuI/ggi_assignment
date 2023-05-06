const express = require("express")
const todoRoute = express.Router()
todoRoute.use(express.json())

const { TodoModel } = require("../model/todomodel")

todoRoute.get("/", async (req, res) => {

    try {
        const data = await TodoModel.find({ userID: req.body.userID })
        res.status(200).send({ "Todos": data })
    }
    catch (err) {
        res.status(404).send({ "error": err })
    }
})

todoRoute.post("/add", async (req, res) => {
    const { name, priority } = req.body
    try {
        const data = new TodoModel({ name, priority, userID: req.body.userID })
        await data.save()

        res.send({ "message": "Todo added" })
    }
    catch (err) {
        res.status(404).send({ "error": err })
    }
})

todoRoute.patch("/update/:id", async (req, res) => {
    const ID = req.params.id
    const payload = req.body
    try {
        await TodoModel.findOneAndUpdate({ _id: ID }, payload)
        res.send({ Message: "Data successfully modified", });
    }
    catch (error) {
        res.status(404).send({
            Message: "Bad request 404",
        });
    }
})

todoRoute.delete("/:id", async (req, res) => {
    const ID = req.params.id;
    try {
        await TodoModel.findOneAndDelete({ _id: ID })
        res.status(200).send({
            Message: "Data successfully deleted",
        });
    }
    catch (error) {
        res.status(404).send({
            Message: "Bad request 404",
        });
    }
})


module.exports = {
    todoRoute
}
