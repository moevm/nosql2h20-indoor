const schemas = require('../../models/schemas');
const Item = schemas.item;

module.exports = function (req, res, next) {
    Item.find()
        .then(items => res.render('index', {items}))
        .catch(err => res.status(404).json({msg: 'No items found'}));
};