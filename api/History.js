const {Schema, model} = require('mongoose')

const historySchema = new Schema({
    icon: String,
    name: String,
    country: String,
    main: String,
    description: String,
    temp: Number,
    pressure: Number,
    humidity: Number
})

const History = model('History', historySchema)

module.exports = History