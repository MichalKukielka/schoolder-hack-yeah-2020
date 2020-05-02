const mongoose = require("mongoose");

const homeworkSchema = new mongoose.Schema({
    subject: String,
    questions: [{
        question: String,
        A: String,
        B: String,
        C: String,
        D: String,
        correct: String,
    }]
})

module.exports = mongoose.model("Homework", homeworkSchema);