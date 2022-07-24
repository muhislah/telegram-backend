const express = require('express')
const { auth } = require('../middleware/auth')
const router = express.Router()
const { getProfile, getAllUser, getProfilebyId } = require('../controller/profileController')

router
    .get('/', auth , getProfile)
    .get('/all', auth, getAllUser)
    .get('/:id', getProfilebyId)
    
module.exports = router