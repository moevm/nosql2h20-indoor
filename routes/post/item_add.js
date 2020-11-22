const Item = require('../../models/Item');

module.exports = function (req, res) {
    const redirect_url = '/';
    if (req.body.name) {
        const newItem = new Item({
            name: req.body.name
        });
        newItem.save();
        console.log(`POST '${req.body.name}' item saved`)
    }
    console.log(`POST '${req.body.name}' redirecting to '${redirect_url}'`)
    res.redirect(redirect_url);
};