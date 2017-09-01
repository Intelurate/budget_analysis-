var express = require('express');
var app = express();
var fs = require('fs');
//var multer = require('multer'); 

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true,
    limit: '50mb'
}));

//app.use(multer());

var server = require('http').createServer(app);

console.log('Helloworld')

server.listen(7676);

require('./controllers/main.js').set(app);
require('./controllers/bootstrap.js').set(app);

module.exports = app;