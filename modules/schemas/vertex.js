const mongoose = require('../db');
const Schema = mongoose.Schema;
const edgeSchema = require('./edge');

const VertexSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    transitions: [edgeSchema]
}, {versionKey: false});

VertexSchema.virtual('id').get(function () {
    return this._id;
});

module.exports = Vertex = mongoose.model('vertex', VertexSchema, 'vertices');
