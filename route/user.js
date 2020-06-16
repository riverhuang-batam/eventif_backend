const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const checkAuth = require('../middleware/check-auth')
router.get('/', userController.userGetAll)
router.post('/signup', userController.userSignUp)
router.post('/signin', userController.userSignIn)
router.delete('/:userId', checkAuth, userController.userDeleteById)

module.exports = router