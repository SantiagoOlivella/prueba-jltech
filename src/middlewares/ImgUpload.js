const multer = require('multer'); 
const path = require('path'); 
const { v4: uuidv4 } = require('uuid'); 

const storage = multer.diskStorage({ 
    destination: path.join(__dirname, "../storage/imgs"),
    filename: function (req, file, cb) {
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    },
});



const upLoad = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|svg|SVG|JPG|PNG / 
        const mimetype = fileTypes.test(file.mimetype); 
        const extname = fileTypes.test(path.extname(file.originalname));
        if (mimetype && extname) { 
            return cb(null, true);
        }
        cb('Error : El archivo no es valido, debe ser /jpeg|jpg|png|svg|SVG|JPG|PNG /')
    },
});

module.exports = upLoad;