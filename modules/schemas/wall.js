const mongoose = require('../db');
const Schema = mongoose.Schema;

const WallSchema = new Schema({
    coords_start_x: {
        type: Number,
        required: true
    },
    coords_start_y: {
        type: Number,
        required: true
    },
    coords_end_x: {
        type: Number,
        required: true
    },
    coords_end_y: {
        type: Number,
        required: true
    }
}, { _id: false });

module.exports = WallSchema;
