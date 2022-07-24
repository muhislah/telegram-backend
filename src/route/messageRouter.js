const express = require('express')
const { addMessage, getMessage, updateMessage, deleteMessage } = require('../controller/messageController')
const { auth } = require('../middleware/auth')
const router = express.Router()

router
    .post('/add', auth , addMessage)
    .get('/:receiver_id' , auth , getMessage)
    .put('/:id', auth, updateMessage)
    .delete('/:id', auth, deleteMessage)

module.exports = router