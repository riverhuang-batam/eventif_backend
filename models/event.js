const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    location: {type: String, required: true},
    eventImage: {type: String, required: true},
})
module.exports = mongoose.model('Event', eventSchema)