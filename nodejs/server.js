var express = require('express');
var app = express();
var fs = require("fs");

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       res.end( data );
   });
});

app.get('/listActivities', function (req, res) {
   fs.readFile( __dirname + "/" + "activities.json", 'utf8', function (err, data) {
       res.end( data );
   });
});

var server = app.listen(8090, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)

});
