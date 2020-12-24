const path = require('path');
const Room = require(path.join(appRoot, 'modules/schemas')).room;
const room_types = require(path.join(appRoot, 'modules/constants')).room_type;

const buildFloor = async (floor) => {
    console.log(`floor - building ${floor} floor walls`);
    return Room.aggregate([
        {$match: {room_type: {$in: [room_types.AUDIENCE, room_types.FLOOR]}, floor: floor}},
        {$unwind: '$walls'},
        {$group: {_id: '$room_type', room_type: {$first: '$room_type'}, walls: {$push: '$walls'}}},
        {$unset: '_id'}
    ]);
};

module.exports = buildFloor;