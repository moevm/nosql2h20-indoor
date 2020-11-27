const schemas = require('../../modules/schemas');
const Room = schemas.room;

module.exports = async function (req, res, next) {
    let query = req.body.search
    Room.fuzzySearch(`${query}`, (err, doc) => {
        if (err) {
            console.error(err);
        } else {
            res.set('application/json').json(JSON.stringify(doc));
        }
    });
};