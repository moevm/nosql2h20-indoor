const path = require('path');
const schemas = require(path.join(appRoot, 'modules/schemas'));
const Room = schemas.room;
const Vertex = schemas.vertex;
const fs = require('fs')

module.exports = function (req, res, next) {
    fpath = path.join(appRoot, req.file.path)
    let data = require(fpath)

    let room_data = data.room;
    for (let i = 0; i < room_data.length; i++) {
        new Room(room_data[i]).save((err, doc) => {
            if (err) console.error(err);
        });
    }
    console.log(`${room_data.length} items imported to rooms`);
    let vertex_data = data.vertex;
    for (let i = 0; i < vertex_data.length; i++) {
        new Vertex(vertex_data[i]).save((err, doc) => {
            if (err) console.error(err);
        });
    }
    console.log(`${vertex_data.length} items imported to vertices`);
    fs.unlink(fpath, (err) => {
        if (err) {
            console.error(err)
        }
    })
};