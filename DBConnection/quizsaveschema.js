const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    topic: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true }
});

const quizcollaction = mongoose.model("Quiz", quizSchema)
module.exports = quizcollaction