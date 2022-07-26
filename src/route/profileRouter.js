const express = require('express')
const { auth } = require('../middleware/auth')
const router = express.Router()
const { getProfile, getAllUser, getProfilebyId , updateProfile } = require('../controller/profileController')
const { upload } = require('../middleware/cloudinaryUpload')

router
    .get('/', auth , getProfile)
    .get('/all?', auth, getAllUser)
    .get('/:id', getProfilebyId)
    .put('/', upload.single('photo') ,auth , updateProfile)
    
module.exports = router