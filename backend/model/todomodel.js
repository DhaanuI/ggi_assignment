const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    name: String,
    priority: String,
    status: { type: String, default: 'pending' },
    userID:String
})

const TodoModel = mongoose.model("todo", todoSchema)

module.exports = {
    TodoModel
}