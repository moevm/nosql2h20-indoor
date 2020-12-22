const path = require('path');
const mongoose = require(path.join(appRoot, 'modules/db'));
const edgeSchema = require(path.join(appRoot, 'modules/schemas/edge'));
const Schema = mongoose.Schema;

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

console.log("schemas - vertex schema initialized");

module.exports = Vertex = mongoose.model('vertex', VertexSchema, 'vertices');
