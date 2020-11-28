require('dotenv').config()

const DEBUG = process.env.DEBUG_NESSAGES_ENABLED === "true";
const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

console.log = DEBUG ? console.log : function () {};

const express = require('express');
const app = express();
const path = require('path');
global.appRoot = __dirname;

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require(path.join(__dirname, 'routes/__init__')));

let server = app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.info(`Server running at http://${server.address().address}:${server.address().port}`)
});
