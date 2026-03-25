const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema({
    userId: String,
    videoName: String,
    language:String,
    transcript: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transcript', transcriptSchema);