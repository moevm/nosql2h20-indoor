const mongoose = require('mongoose');

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_NAME = process.env.DATABASE_NAME;
const url = `${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

// Connect to MongoDB
mongoose
    .connect(
        url,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        }
    )
    .then(() => console.log(`MongoDB connected at ${url}`))
    .catch(err => console.error(err));

module.exports = mongoose;