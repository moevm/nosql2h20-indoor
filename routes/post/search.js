const path = require('path');
const schemas = require(path.join(appRoot, 'modules/schemas'));
const search_limit_results = require(path.join(appRoot, 'modules/constants')).search_limit_results;

const Room = schemas.room;

module.exports = function (req, res, next) {
    let query = req.body.search;
    console.log(`search - query '${query}'`);
    if (query) {
        Room.fuzzySearch(`${query}`).limit(search_limit_results).exec((err, doc) => {
            if (err) {
                console.error(err);
            } else {
                res.set('application/json').json(JSON.stringify(doc));
            }
        });
    } else {
        Room.find().exec((err, doc) => {
            if (err) {
                console.error(err);
            } else {
                res.set('application/json').json(JSON.stringify(doc));
            }
        });
    }
};
