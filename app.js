require('dotenv').config()

const DEBUG = process.env.DEBUG_NESSAGES_ENABLED === "true";
const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

console.log = DEBUG ? console.log : function () {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routes/__init__'));

require("./modules/db_init");

let server = app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.info(`Server running at http://${server.address().address}:${server.address().port}`)
});
