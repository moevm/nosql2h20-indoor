const Item = require('../../models/Item');

module.exports = function (req, res, next) {
    Item.find()
        .then(items => res.render('index', {items}))
        .catch(err => res.status(404).json({msg: 'No items found'}));
};