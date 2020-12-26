const path = require('path');
const schemas = require(path.join(appRoot, 'modules/schemas'));
const search_limit_results = require(path.join(appRoot, 'modules/constants')).search_limit_results;
const room_types = require(path.join(appRoot, 'modules/constants')).room_type;

const Room = schemas.room;

module.exports = function (req, res, next) {
    let query = req.body.search;
    console.log(`search - query '${query}'`);
    Room.fuzzySearch(`${query}`, {room_type: {$in: [room_types.AUDIENCE, room_types.BUILDING]}})
        .limit(search_limit_results).exec((err, doc) => {
        if (err) {
            console.error(err);
        } else {
            res.set('application/json').json(JSON.stringify(doc));
        }
    });

};
