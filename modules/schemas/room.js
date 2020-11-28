const path = require('path');
const mongoose = require(path.join(appRoot, 'modules/db'));
const constants = require(path.join(appRoot, 'modules/constants'));
const wallSchema = require(path.join(appRoot, 'modules/schemas/wall'));

const Schema = mongoose.Schema;
const room_type = constants.room_type;

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
RoomSchema.plugin(mongoose_fuzzy_searching, {
    fields: [
        {
            name: 'tags',
            weight: 5,
        },
        {
            name: 'information',
            minSize: 3,
            weight: 3,
        }
    ]
});

console.log("Room schema initialized");

module.exports = Room = mongoose.model('room', RoomSchema, 'rooms');
