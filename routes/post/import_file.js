const path = require('path');
const schemas = require(path.join(appRoot, 'modules/schemas'));
const Room = schemas.room;
const Vertex = schemas.vertex;
const fs = require('fs');
const rebuildGraph = require(path.join(appRoot, 'modules/path/graph')).buildGraph;

module.exports = async function (req, res, next) {
    console.log("import_file - import request");
    let filePath = path.join(appRoot, req.file.path);
    let data = require(filePath);
    console.log(`import_file - file saved to '${filePath}'`);
    let room_data = data.room;
    console.log("import_file - parsing rooms");
    for (let i = 0; i < room_data.length; i++) {
        await Room.updateOne({_id: room_data[i]._id}, room_data[i], {upsert: true}, (err, doc) => {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            }
        });
    }
    console.log(`import_file - ${room_data.length} items imported to rooms`);

    let vertex_data = data.vertex;
    console.log("import_file - parsing vertices");
    for (let i = 0; i < vertex_data.length; i++) {
        Vertex.updateOne({_id: vertex_data[i]._id}, vertex_data[i], {upsert: true}, (err, doc) => {
            if (err) {
                console.error(err);
                res.sendStatus(400);
            }
        });
    }
    console.log(`import_file - ${vertex_data.length} items imported to vertices`);

    console.log(`import_file - rebuilding graph`);
    await rebuildGraph();
    console.log(`import_file - rebuilding graph success`);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            res.sendStatus(500);
        } else {
            console.log(`import_file - file '${filePath}' deleted`);
        }
    });
    console.log(`import_file - done`);
    res.sendStatus(200);
};
