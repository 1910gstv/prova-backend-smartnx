const mongoose = require('mongoose')
require('dotenv').config()

async function initMongo() {
    const uri = process.env.MONGO_URI
    await mongoose.connect(uri, {
        maxPoolSize: 10,
    })

    console.log("Mongo conectado!")
}
module.exports = { initMongo, mongoose}