const path = require('path');
const buildPathPoints = require(path.join(appRoot, 'modules/visualization/visualization'));
const getShortestPath = require(path.join(appRoot, 'modules/path')).getShortestPath;

module.exports = async function (req, res, next) {
    console.log(`path_find - building path from ${req.params.source} to ${req.params.dest}`);
    let path = getShortestPath(req.params.source, req.params.dest);
    console.log(`path_find - getting points`);
    res.json(await buildPathPoints(path));
};