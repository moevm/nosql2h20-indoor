const Path = require("graph-data-structure");
const path = require('path');
const Vertex = require(path.join(appRoot, 'modules/schemas')).vertex;

const state = {
    graph: null
};

const getShortestPath = (source, destination) => {
    if (state.graph === null) {
        console.error("path - error finding path: graph is not built");
        return [];
    }
    console.log(`path - finding path from ${source} to ${destination}`);
    return state.graph.shortestPath(source, destination);
};

const buildGraph = async () => {
    console.log("path - building graph");
    console.log("path - getting vertices");
    let vertices = await Vertex.find();
    let gr = Path();
    let rooms = [];
    let transitions = [];
    console.log("path - parsing vertices");
    vertices.forEach(v => {
        rooms.push(v._id);
        v.transitions.forEach(t => {
            transitions.push([v._id, t.target_id]);
        });
    });
    console.log("path - adding vertices to graph");
    rooms.forEach(r => {
        gr.addNode(r);
    })
    console.log("path - adding edges to graph");
    transitions.forEach(t => {
        gr.addEdge(t[0], t[1]);
    });
    console.log("path - build success");
    state.graph = gr;
};

module.exports = {getShortestPath, buildGraph};