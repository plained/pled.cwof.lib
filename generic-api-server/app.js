//FileName: app.js
var express = require('express');
var common = require("/opt/routes/common.js");
var nocache = require('nocache');

var app = express();
app.use(nocache());
app.get('/', common.getDefaultResponse);
app.get('*', common.getResource);

var http = require('http').Server(app);
http.listen(3000, function(){
  console.log('Server up: http://localhost:3000');
});