const path = require('path');
const schemas = require(path.join(appRoot, 'modules/schemas'));
const Room = schemas.room;
const Vertex = schemas.vertex;

module.exports = async function (req, res, next) {
    console.log(`export_json - exporting database`);
    let data = {
        room: await Room.find(),
        vertex: await Vertex.find()
    };
    console.log(`export_json - success`);
    res.json(data);
};