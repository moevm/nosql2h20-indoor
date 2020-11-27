let router = require('express').Router();

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
add_route('GET', '/', './get/index');

// POST
add_route('POST', '/item/add', './post/item_add');
add_route('POST', '/search', './post/search');


module.exports = router;



