//FileName: app.js
var express = require('express');
var common = require("/opt/routes/common.js");

var app = express();

app.get('/', common.getDefaultResponse);
app.get('*', common.getResource);
app.put('*', common.updResource);
app.post('*', common.updResource);
app.delete('*', common.updResource);

var http = require('http').Server(app);
http.listen(3000, function(){
  console.log('Server up: http://localhost:3000');
});
