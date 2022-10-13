const mongoose = require('mongoose')
const temperatureSchema = new mongoose.Schema({
    DateDuJour:{
        type: String,
        require: true
    },
    Temp:{
        type: Number,
        require: true
    },
    MinTemp:{
        type: Number,
        require: true
    },
    MaxTemp:{
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Temperature', temperatureSchema)