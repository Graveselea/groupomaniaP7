const multer = require("multer"); //--Permet de gérer les fichiers entrants dans les requêtes HTTP

// Configuration de multer pour la gestion des images
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg+xml",
  "image/tiff": "tiff",
  "image/bmp": "bmp",
};

const storage = multer.diskStorage({
  destination: (reg, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("image");
