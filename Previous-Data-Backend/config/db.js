require('dotenv').config()
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("Connected to MongoDB")
    })
}

module.exports = connectToMongo;