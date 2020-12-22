const Graph = require("graph-data-structure");
const path = require('path');
const Vertex = require(path.join(appRoot, 'modules/schemas')).vertex;

const state = {
    graph: null
};

const getShortestPath = (source, destination) => {
    console.log(`graph - finding path from ${source} to ${destination}`);
    return state.graph.shortestPath(source.toString(), destination.toString());
};

const buildGraph = async () => {
    console.log("graph - building graph");
    console.log("graph - getting vertices");
    let vertices = await Vertex.find();
    let gr = Graph();
    let rooms = [];
    let transitions = [];
    console.log("graph - parsing vertices");
    vertices.forEach(v => {
        rooms.push(v._id);
        v.transitions.forEach(t => {
            transitions.push([v._id, t.target_id]);
        });
    });
    console.log("graph - adding vertices to graph");
    rooms.forEach(r => {
        gr.addNode(r);
    })
    console.log("graph - adding edges to graph");
    transitions.forEach(t => {
        gr.addEdge(t[0], t[1]);
    });
    console.log("graph - build success");
    state.graph = gr;
};

module.exports = {getShortestPath, buildGraph};