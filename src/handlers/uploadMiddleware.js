const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadMiddleware = upload.single("cover");

module.exports = uploadMiddleware;
