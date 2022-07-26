// const multer = require('multer')

// const storage =  multer.memoryStorage()

// const multerUploads = multer({ storage }).fields([{
//     name: 'image', maxCount: 1
// }, {
//     name: 'video', maxCount: 1
// }])
// module.exports = { multerUploads }

const multer = require('multer')
const { storage } = require('../config/cloudinary')

const upload = multer({
    storage : storage
})

module.exports = { upload }