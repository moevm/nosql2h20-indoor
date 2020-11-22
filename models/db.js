const mongoose = require('mongoose');

const url = "mongodb://localhost:27017";

// Connect to MongoDB
mongoose
    .connect(
        url,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

module.exports = mongoose;