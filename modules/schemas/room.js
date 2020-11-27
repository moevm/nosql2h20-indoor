const mongoose = require('../db');
const Schema = mongoose.Schema;
const constants = require('../constants');
const room_type = constants.room_type;
const wallSchema = require('./wall');

const RoomSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: false,
        default: function () {
            return this.id;
        }
    },
    room_type: {
        type: Number,
        required: true,
        default: room_type.AUDIENCE
    },
    floor: {
        type: Number,
        required: false
    },
    information: {
        type: String,
        required: false
    },
    tags: {
        type: String,
        required: true,
        default: ''
    },
    address: {
        type: String,
        required: false
    },
    walls: [wallSchema]
}, {versionKey: false});

RoomSchema.virtual('id').get(function () {
    return this._id;
});

const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');
RoomSchema.plugin(mongoose_fuzzy_searching, { fields: [
        {
            name: 'tags',
            minSize: 2,
            weight: 5,
        },
        {
            name: 'information',
            minSize: 2,
            weight: 3,
        }
    ] });

module.exports = Room = mongoose.model('room', RoomSchema, 'rooms');
