const express = require('express')
const server = express()
const bodyParser = require("body-parser")
const mongoose = require('mongoose')
const eventRoutes = require('./route/event')
const userRoutes = require('./route/user')
require('dotenv').config()

mongoose.set('useCreateIndex', true);
mongoose.connect(`${process.env.MONGODBURL}`, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('user connected'))


server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use('/uploads', express.static('uploads'))
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000", "https://eventsif.com");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-requested-With, Content-type, Authorization"
    )
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next();
})

server.use('/event', eventRoutes)
server.use('/user', userRoutes)

const port = 8000
server.listen(port, () => console.log(`server is working on ${port}`))