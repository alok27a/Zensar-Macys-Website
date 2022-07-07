const config = require('config')
const mongoose = require('mongoose')
const mongoURI = config.get('mongoURI')

const connectToMongo = () => {
    mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("Connected to MongoDB")
    })
}

module.exports = connectToMongo;