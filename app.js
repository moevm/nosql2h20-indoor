const DEBUG = true;
const PORT = 3000;

console.log = DEBUG ? console.log : function () {};

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/', require('./routes/__init__'));

app.listen(PORT, () => console.info(`Server running at port ${PORT}`));
