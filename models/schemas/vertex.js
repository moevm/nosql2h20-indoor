const mongoose = require('../db');
const Schema = mongoose.Schema;
const edgeSchema = require('./edge');

const VertexSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    transitions: [edgeSchema]
});

module.exports = Vertex = mongoose.model('vertex', VertexSchema);
