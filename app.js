// var models = require("./models"); //place on top of the file
// models.sequelize.sync().then(function() {
//  // var server = app.listen(app.get('port'), function() {
//  var server = app.listen(8090, function() {
//  console.log('Express server listening on port ' + server.address().port);
//  });
// });

// var express = require('express');
// var app = express();
// var routes = require('./routes'); //place on top of the file</pre>
// app.get('/todo', routes.gettodos);
// app.post('/todo', routes.savetodos);


var http = require('http');
var fs = require('fs');

function onRequest(request, response){
	response.setHeader('Content-Type', 'text/javascript');
	response.writeHead(200,{'Content-type':'text/html'});
	fs.readFile('index.html',null,function(error,data){
		if (error) {
		}else{
			response.write(data, 'utf8');
		};
		response.end();
	});
};

http.createServer(onRequest).listen(8000);