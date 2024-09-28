const multer = require('multer');
const path = require('path');

// Define storage with correct path resolution
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use path.join to resolve the relative path correctly
    cb(null, path.join(__dirname, './file-uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

const upload = multer({ storage: storage });
module.exports = upload;
