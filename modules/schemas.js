const path = require('path');

module.exports = {
    room: require(path.join(appRoot, 'modules/schemas/room')),
    vertex: require(path.join(appRoot, 'modules/schemas/vertex'))
};