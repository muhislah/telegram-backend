const express = require('express')
const { registerUser, loginUser } = require('../controller/userController')
const router = express.Router()

router
    .post('/register', registerUser)
    .post('/login', loginUser)

module.exports = router