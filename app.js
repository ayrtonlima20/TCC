var express = require('express');
var app = express();
var models = require("./models"); //place on top of the file
var mysql = require("mysql");
var bodyParser = require('body-parser');


app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

models.sequelize.sync().then(function() {
 // var server = app.listen(app.get('port'), function() {
 	var server = app.listen(8090, function() {
	 	console.log('Express server listening on port ' + server.address().port);
		app.get('/listKanban', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				var dataInicio, dataFim;
				if(err){
					console.log('Error connecting to Atividades database');
					return;
				}else{
					con.query(" SELECT act.*, user.nome as participante, hist.nome as historyName" +  
							  "     FROM atividades as act" +
							  "		INNER JOIN historias as hist ON hist.idHistoria = act.idHistoria" +
							  "		INNER JOIN usuarios as user ON user.idUsuario = act.idParticipante",function(err,data){
						if(err) throw err;
						// console.log('Data received from Db:\n');
						// console.log(JSON.stringify(data));
						var database = data;
						var models = {
					        selected: null,
					        lists: {
					            "ToDo": [], 
					            "Doing": [], 
					            "Testing":[], 
					            "Done":[]
					        }
					    };

						for (var i = 0; i < database.length; i++) {
							// muda o formato de saida da data
							dataInicio = new Date(database[i].dataInicio);
							database[i].dataInicio = getDateFormatDDMMYY(dataInicio);

							dataFim = new Date(database[i].dataFim);
							database[i].dataFim = getDateFormatDDMMYY(dataFim);
							// if (dataInicio.getTime() < dataFim.getTime()) {
							// 	console.log(dataFim.getTime() + "-" + dataInicio.getTime());
							// 	console.log(dataFim.getTime() - dataInicio.getTime());
							// };
							// qual cor a atividade tera



							// verifica em qual quadro se enquadrará	
							if (database[i].status === "ToDo") {
								models.lists.ToDo.push(database[i]);	
							}else if (database[i].status === "Doing") {
								models.lists.Doing.push(database[i]);	
							}else if (database[i].status === "Testing") {
								models.lists.Testing.push(database[i]);	
							}else if (database[i].status === "Done") {
								models.lists.Done.push(database[i]);	
							};
						};
		   				res.end( JSON.stringify(models) );
					});
				};

				// console.log('Connection established');
			});
		});
		app.get('/listUsuarios', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Usuarios database');
					return;
				}else{
					con.query('SELECT * FROM usuarios',function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data) );
					});
				};

				// console.log('Connection established');
			});
		});
		app.get('/listHistorias', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Historias Database');
					return;
				}else{
					con.query('SELECT * FROM historias',function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data) );
					});
				};

				// console.log('Connection established');
			});
		});
		app.get('/getSprintActive', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Sprint Database');
					return;
				}else{
					con.query('SELECT * FROM sprint WHERE active = "X"',function(err,data){
						if(err) throw err;
						var dataInicio, dataFim;
						for (var i = 0; i < data.length; i++) {
							// muda o formato de saida da data
							dataInicio = new Date(data[i].dataInicio);
							data[i].dataInicio = getDateFormatDDMMYY(dataInicio);

							dataFim = new Date(data[i].dataFim);
							data[i].dataFim = getDateFormatDDMMYY(dataFim);
						};
		   				res.end( JSON.stringify(data) );
					});
				};

				// console.log('Connection established');
			});
		});
		app.post('/setSprint', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Sprint Database');
					return;
				}else{	
					var idSprint  = 1; 
					var descricao = req.body.teste
					console.log(descricao);
					con.query('update sprint set descricao = "'+ descricao + '" where idSprint = 1',function(err,data){
						if(err) throw err;
					});
				};

				// console.log('Connection established');
			});
		});
		app.post('/setAtividade', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Sprint Database');
					return;
				}else{	
					console.log("teste");
					console.log(req.body);
					var idAtividade = req.body.idAtividade === undefined ? 0 : req.body.idAtividade;
					var idParticipante = req.body.idParticipante === undefined ? 0 : req.body.idParticipante;
					var idHistoria = req.body.idHistoria === undefined ? 0 : req.body.idHistoria;
					var duracao = req.body.duracao === undefined ? 8 : req.body.duracao;
					// var dataInicio = req.body.dataInicio;
					// var dataFim	= req.body.dataFim;
					var status = req.body.status === undefined ? "" : req.body.status;
					var descricao = req.body.descricao === undefined ? "" : req.body.descricao;
					var bloqueada = req.body.bloqueada === undefined ? "" : req.body.bloqueada;
					var prioridade = req.body.prioridade === undefined ? 0 : req.body.prioridade;

					con.query('update atividades set idParticipante = '+ idParticipante + 
								', idHistoria = ' + idHistoria +
								',duracao = ' + duracao  +
								',status = "' + status +
								'", descricao = "' + descricao  +
								'", bloqueada = "' + bloqueada  +
								'", prioridade = "' + prioridade +
								'" where idAtividade = ' + idAtividade,function(err,data){
						if(err) throw err;
					});
				};

				// console.log('Connection established');
			});
		});
		app.post('/delAtividade', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Sprint Database');
					return;
				}else{	
					var idAtividade = req.body.idAtividade === undefined ? 0 : req.body.idAtividade;

					con.query('delete from atividades where idAtividade = ' + idAtividade,function(err,data){
						if(err) throw err;
					});
				};

				// console.log('Connection established');
			});
		});
		function getMes (date) {
			var month = date.getMonth() + 1;
    		return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
		};
		function getDia (date) {
			var day = date.getDate();
    		return day < 10 ? '0' + day : '' + day; // ('' + month) for string result
		};
		function getDateFormatDDMMYY(date){
			return getDia(date) + '-' + getMes(date) + '-' + date.getFullYear();
			// database[i].month = date.getMonth() + 1;
			// database[i].day = date.getDate();
			// database[i].hours = date.getHours();
			// database[i].year = date.getFullYear();
		};
		function getTimeFormatHHMMSS(time) {
			console.log(time);
			return time.getHours() + '' + time.getMinutes(); + '' + time.getSeconds();
		};
 	});
});

// var express = require('express');
// var app = express();
// var routes = require('./routes'); //place on top of the file</pre>
// app.get('/todo', routes.gettodos);
// app.post('/todo', routes.savetodos);


// var http = require('http');
// var fs = require('fs');

// function onRequest(request, response){
// 	response.setHeader('Content-Type', 'text/javascript');
// 	response.writeHead(200,{'Content-type':'text/html'});
// 	fs.readFile('models/index.js',null,function(error,data){
// 		if (error) {
// 		}else{
// 			response.write(data, 'utf8');
// 		};
// 		response.end();
// 	});
// };

// http.createServer(onRequest).listen(8000);