const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const journalSchema = new Schema({
    happiness: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Journal', journalSchema);