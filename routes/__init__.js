router = require('express').Router();

// GET
method = 'GET';

path = '/';
file = './get/index';
router.get(path, require(file));
console.log(`${method} '${path}' initialized from file ${file.replace('.', './routes')}`);

// POST
method = 'POST';

path = '/item/add';
file = './post/item_add';
router.post(path, require(file));
console.log(`${method} '${path}' initialized from file ${file.replace('.', './routes')}`);

module.exports = router;



