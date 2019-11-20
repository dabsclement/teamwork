/* eslint-disable consistent-return */
const path = require('path');
const multer = require('multer');
const cloudStorage = require('./cloud-config');


// const cloudStorage = cloudinaryStorage({
//   cloudinary,
//   folder: 'csip',
// });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(new Error('hello bro'), './images/uploads');
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}`);
//   }
// });
const storage = './images/uploads/';


const checkFileType = (type) => {
  return (req, file, cb) => {
    let filetype;

    if (type === 'images/gif') {
      filetype = /image|gif/;
    }
    // GET FILE EXTENSION
    const extname = filetype.test(path.extname(file.originalname).toLowerCase());

    // GET MIME
    const mimetype = filetype.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error(`Error occured: Please uploade ${type.toUpperCase()} only`));
  };
};


const upload = multer({ dest: storage }).single('image');


module.exports = upload;
