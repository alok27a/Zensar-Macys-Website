const mongoose = require('mongoose')

const ArimaSchema = mongoose.Schema({
    _id:
        mongoose.Schema.Types.ObjectId,
    date: {
        type: Date,
        required: true
    },
    count1: {
        type: String,
        required: true
    },
    Priority: {
        type: String,
        required: true
    },
    Category: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("details", ArimaSchema);