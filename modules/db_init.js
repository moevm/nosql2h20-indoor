const path = require('path');
const schemas = require(path.join(appRoot, 'modules/schemas'));
const Room = schemas.room;

const INIT_DATA_FILE = process.env.INIT_DATA_FILE;
const data = require(INIT_DATA_FILE);

Room.countDocuments(function (err, count) { // Check if Room collection is empty
    if (!err && count === 0) {
        for (let i = 0; i < data.length; i++) {
            new Room(data[i]).save((err, doc) => {
                if (err) console.error(err);
            });
        }
        console.log(`Database initialized with ${data.length} items`);
    }
});



