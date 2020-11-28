let router = require('express').Router();
const path = require('path');

function add_route(method, path, file) {
    switch (method.toUpperCase()) {
        case "GET":
            router.get(path, require(file));
            break;
        case "POST":
            router.post(path, require(file));
            break;
        case "PUT":
            router.put(path, require(file));
            break;
        default:
            router.use(path, require(file));
    }
    console.log(`Initialized ${method} route at '${path}' from file '${file.replace('.', './routes')}'`);
}

// GET
add_route('GET', '/', path.join(appRoot, 'routes/get/index'));

// POST
add_route('POST', '/search', path.join(appRoot, 'routes/post/search'));


const multer = require('multer');
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
let upload = multer({ storage: storage })
router.post('/import/file', upload.single('data'), require(path.join(appRoot, 'routes/post/import_file')))

//add_route('POST', '/import/file', path.join(appRoot, 'routes/put/import_file'), upload.single('data'));

module.exports = router;



