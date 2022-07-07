const config = require('config')
const express = require('express')
var cors = require('cors')
const connectToMongo = require('./config/db')

connectToMongo()
const app = express()
const port = config.get('port')

app.use(cors())
app.use(express.json())

// Available Routes
app.use('/api/previousdata/',require('./routes/details'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

