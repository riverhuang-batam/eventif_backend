const mongoose = require('mongoose')
const Event = require('../models/event')
const multer =require('multer');

module.exports = {
    eventGetAll: (req, res) => {
        Event.find()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(response))
    },
    eventPost: (req, res) => {
        const event = new Event({
            _id: new mongoose.Types.ObjectId,
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            location: req.body.location,
            eventImage: req.file.path
        })
        event.save()
        .then(result => res.status(200).json(result))
        .catch(err => res.status(500).json(err))
    }
}