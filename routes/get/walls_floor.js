const path = require('path');
const buildFloor = require(path.join(appRoot, 'modules/visualization/floor'));

module.exports = async function (req, res, next) {
    console.log(`walls_floor - building ${req.params.floor} floor`);
    res.json(await buildFloor(parseInt(req.params.floor)));
};