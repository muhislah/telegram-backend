// const createError = require('http-errors')
// const multer = require('multer')
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './upload')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, 'recipe' + '-' + uniqueSuffix + '-' + file.originalname)
//     }
// })

// const cloudinaryStorage =  new CloudinaryStorage({
//     cloudinary : cloudinary,
//     params : {
//         folder : 'food-recipe',
//         format : async(req, file ) => 'png',
//         public_id
//     }
// })

// const upload = multer({
//     storage: cloudinaryStorage
// })

// module.exports = upload