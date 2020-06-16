const express = require('express');
const router = express.Router();
const multer = require('multer')
const eventControllers = require('../controllers/event')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null, false);
    } else {
        cb(null, true)
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter: fileFilter
})

router.get('/', eventControllers.eventGetAll)
router.post('/',upload.single('eventImage'), eventControllers.eventPost)

module.exports = router;