let router = require('express').Router();
const path = require('path');
const upload = require(path.join(appRoot, 'modules/multer_init'))

function add_route(method, path, file, options) {
    switch (method.toUpperCase()) {
        case "GET":
            router.get(path, options, require(file));
            break;
        case "POST":
            router.post(path, options, require(file));
            break;
        case "PUT":
            router.put(path, options, require(file));
            break;
        default:
            router.use(path, options, require(file));
    }
    console.log(`Initialized ${method} route at '${path}' from file '${file.replace('.', './routes')}'`);
}

// GET
add_route('GET', '/', path.join(appRoot, 'routes/get/index'), upload.none());

// POST
add_route('POST', '/search', path.join(appRoot, 'routes/post/search'), upload.none());

add_route('POST', '/import/file', path.join(appRoot, 'routes/post/import_file'), upload.single('data'));

module.exports = router;



