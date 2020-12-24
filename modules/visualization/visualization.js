const path = require('path');
const Vertex = require(path.join(appRoot, 'modules/schemas')).vertex;
const isEqual = require('underscore').isEqual;

const buildPathPoints = async (path) => {
    console.log(`visualization - building path [${path}]`);
    console.log(`visualization - getting vertices from path`);
    let vertices = await Vertex.find().where('_id').in(path);
    console.log('visualization - sorting vertices');
    vertices.sort((a, b) => path.findIndex((o => o == a._id)) - path.findIndex((o => o == b._id)));
    let points = [];
    console.log('visualization - getting points');
    vertices.forEach(function (v, index) {
        if (!vertices[index + 1]) return;

        let nextId = path[index + 1];

        let transition = v.transitions.find(t => t.target_id == nextId);
        let source = [
            transition.coords_source_floor,
            transition.coords_source_x,
            transition.coords_source_y
        ];
        let destination = [
            transition.coords_target_floor,
            transition.coords_target_x,
            transition.coords_target_y
        ];
        if (!isEqual(source, points[points.length - 1]))
            points.push(source);
        if (!isEqual(destination, source))
            points.push(destination);
    });
    console.log('visualization - building visualization success');
    return points;
};

module.exports = buildPathPoints;
