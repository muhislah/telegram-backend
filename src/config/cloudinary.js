const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')
dotenv.config()
const { CloudinaryStorage } = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profile',
        resource_type: 'image',
        allowed_format : ['image/jpg','image/png','image/jpeg']
    }
});


module.exports = {storage}

