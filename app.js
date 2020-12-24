require('dotenv').config();

const DEBUG = process.env.DEBUG_NESSAGES_ENABLED === 'true';

console.log = DEBUG ? console.log : function () {};

const express = require('express');
const app = express();
const path = require('path');
global.SERVER_HOST = process.env.SERVER_HOST;
global.SERVER_PORT = process.env.SERVER_PORT;
global.appRoot = __dirname;

console.log(`app - host: ${SERVER_HOST}`);
console.log(`app - port: ${SERVER_PORT}`);
console.log(`app - root: '${appRoot}'`);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'pug');
console.log('app - view engine set to pug')
app.set('views', path.join(appRoot, 'views'));
console.log('app - views set');

app.use(express.urlencoded({ extended: true }));
app.use(require('less-middleware')(path.join(appRoot, 'public')));
console.log('app - less-middleware enabled');
app.use(express.static(path.join(appRoot, 'public')));

app.use('/', require(path.join(appRoot, 'routes/__init__')));
console.log('app - routes set');

require(path.join(appRoot, 'modules/path')).buildGraph().then();

let server = app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.info(`app - server running at http://${server.address().address}:${server.address().port}`);
});
