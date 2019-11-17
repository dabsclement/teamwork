const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // "dyieekcre"
  api_key: process.env.CLOUD_KEY, // "732513327822775"
  api_secret: process.env.CLOUD_SECRET // "HzlXLGG447c9m92q6a8vhWoiR-c"
});


const cloudStorage = cloudinaryStorage({
  cloudinary,
  folder: 'teamwork',
});

module.exports = cloudStorage;
