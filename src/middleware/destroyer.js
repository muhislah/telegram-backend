const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports.destroyer = async (image, type) => {
    cloudinary.uploader.destroy(image, {
        resource_type : type
    }, (err, result) => {
        if (err) {
            return console.log(err)
        }
        console.log(result)
    });
}

