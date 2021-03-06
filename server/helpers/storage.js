const multer = require('multer');

const diskStorage = multer.diskStorage({
  destination: (req, file, cb, next) => {
    cb(null, 'images');
  },
  filename: (req, file, cb, next) => {
    const mimeType = file.mimetype.split('/');
    const fileType = mimeType[1];
    const fileName = file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (req, file, cb, next) => {
  const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false);
};

const userStorage = multer({ storage: diskStorage, fileFilter: fileFilter });

module.exports = userStorage;
