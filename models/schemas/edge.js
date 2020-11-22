const mongoose = require('../db');
const Schema = mongoose.Schema;

const EdgeSchema = new Schema({
    target_id: {
        type: Number,
        required: true
    },
    coords_source_floor: {
        type: Number,
        required: true
    },
    coords_source_x: {
        type: Number,
        required: true
    },
    coords_source_y: {
        type: Number,
        required: true
    },
    coords_target_floor: {
        type: Number,
        required: true
    },
    coords_target_x: {
        type: Number,
        required: true
    },
    coords_target_y: {
        type: Number,
        required: true
    }
});

module.exports = EdgeSchema;
