const path = require('path');
const schemas = require(path.join(appRoot, 'modules/schemas'));
const Room = schemas.room;
const Vertex = schemas.vertex;
const fs = require('fs');

module.exports = async function (req, res, next) {
    fpath = path.join(appRoot, req.file.path);
    let data = require(fpath);

    let room_data = data.room;
    for (let i = 0; i < room_data.length; i++) {
        await Room.updateOne({_id: room_data[i]._id}, room_data[i], {upsert: true}, (err, doc) => {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            }
        });
    }
    console.log(`${room_data.length} items imported to rooms`);

    let vertex_data = data.vertex;
    for (let i = 0; i < vertex_data.length; i++) {
        Vertex.updateOne({_id: vertex_data[i]._id}, vertex_data[i], {upsert: true}, (err, doc) => {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            }
        });
    }
    console.log(`${vertex_data.length} items imported to vertices`);

    fs.unlink(fpath, (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        }
    });
    res.sendStatus(200);
};
