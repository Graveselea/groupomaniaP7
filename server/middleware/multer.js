const multer = require("multer"); // appel multer

const storage = multer.diskStorage({
  destination: "images/",
  filename: function (req, file, cb) {
    cb(null, makeFileName(req, file))
  }
})


function makeFileName(req, file) {
  const fullName = `${Date.now()}-${file.originalname}`.replace(/\s/g, "-") // replace pour supprimer les espace g (globale) + ` backticks
  file.fullName = fullName
  return fullName
}

const upload = multer({ storage })

module.exports = {upload}