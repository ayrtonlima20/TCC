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
						var models = {
					        selected: null,
					        lists: {
					            "ToDo": [], 
					            "Doing": [], 
					            "Testing":[], 
					            "Done":[]
					        }
					    };

						for (var i = 0; i < data.length; i++) {
							// muda o formato de saida da data
							dataInicio = new Date(data[i].dataInicio);
							data[i].dataInicio = getDateFormatDDMMYY(dataInicio);
							data[i].horaInicio = getTimeFormatHHMMSS(dataInicio);

							dataFim = new Date(data[i].dataFim);
							data[i].dataFim = getDateFormatDDMMYY(dataFim);
							data[i].horaFim = getTimeFormatHHMMSS(dataFim);
							// if (dataInicio.getTime() < dataFim.getTime()) {
							// 	console.log(dataFim.getTime() + "-" + dataInicio.getTime());
							// 	console.log(dataFim.getTime() - dataInicio.getTime());
							// };

							// qual cor a atividade terá
							if (data[i].status === "Done"){
								// preencher com flag que foi para done
							}else{
								data[i].flag = getFlagKanban("09", "18", dataInicio, dataFim, data[i].duracao);
							}
							// verifica em qual quadro se enquadrará	
							if (data[i].status === "ToDo") {
								models.lists.ToDo.push(data[i]);	
							}else if (data[i].status === "Doing") {
								models.lists.Doing.push(data[i]);	
							}else if (data[i].status === "Testing") {
								models.lists.Testing.push(data[i]);	
							}else if (data[i].status === "Done") {
								models.lists.Done.push(data[i]);	
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
					con.query('SELECT * FROM historias ORDER BY prioridade',function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data) );
					});
				};

				// console.log('Connection established');
			});
		});
		app.post('/setStatusHistoria', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Historia Database');
					return;
				}else{	
					var idHistoria = req.body.idHistoria === undefined ? 0 : req.body.idHistoria;
					var status = req.body.status === undefined ? "ProductBacklog" : req.body.status;
					con.query('update historias set status = "' + status +
						'" where idHistoria = ' + idHistoria,function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
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
					var idAtividade = req.body.idAtividade === (undefined || null) ? 0 : req.body.idAtividade;
					var idParticipante = req.body.idParticipante === (undefined || null) ? 0 : req.body.idParticipante;
					var idHistoria = req.body.idHistoria === (undefined || null) ? 0 : req.body.idHistoria;
					var nome = req.body.nome === (undefined || null) ? "" : req.body.nome;
					var duracao = req.body.duracao === (undefined || null) ? 8 : req.body.duracao;
					var descricao = req.body.descricao === undefined ? "" : req.body.descricao;
					var bloqueada = req.body.bloqueada === (undefined || null)? "" : req.body.bloqueada;
					var prioridade = req.body.prioridade === (undefined || null) ? 0 : req.body.prioridade;

					console.log(req.body.length);

					con.query('update atividades set idParticipante = '+ idParticipante + 
								', idHistoria = ' + idHistoria +
								', nome = "' + nome + 
								'",duracao = ' + duracao  +
								',descricao = "' + descricao  +
								'",bloqueada = "' + bloqueada  +
								'",prioridade = "' + prioridade +
								'" where idAtividade = ' + idAtividade,function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};

				// console.log('Connection established');
			});
		});
		app.post('/setStatusAtividade', function (req, res) {
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
					var queryStatus = req.body.status === undefined ? "" : 'status = "' + req.body.status + '"';
					var queryDataInicio = "";
					var queryDataFim = "";
					var dataInicio = null;
					var horaInicio = null;
					var dataFim = null;
					var horaFim = null;
					var date = new Date();
					var hours = new Date();
					if (req.body.oldColumn === "ToDo"  && req.body.status != "ToDo"){
						dataInicio = getDateFormatDDMMYY(date);
						horaInicio = getTimeFormatHHMMSS(date);
						dataFim = getDateFormatDDMMYY(getDataFim(date, req.body.estimativa, "09", "18"));
						horaFim = getTimeFormatHHMMSS(getDataFim(hours, req.body.estimativa, "09", "18"));
						var queryDataInicio = ",dataInicio = str_to_date('" + dataInicio + horaInicio + "' ,'%d-%m-%Y %H:%i:%s')";
						var queryDataFim = ",dataFim = str_to_date('" + dataFim + horaFim + "' ,'%d-%m-%Y %H:%i:%s')";
					}else if(req.body.status === "Done"){
						dataFim = getDateFormatDDMMYY(date);
						horaFim = getTimeFormatHHMMSS(hours);
						var queryDataFim = ",dataFim = str_to_date('" + dataFim + horaFim + "' ,'%d-%m-%Y %H:%i:%s')";
					}else if (req.body.oldColumn === "Done"  && req.body.status != "Done" && req.body.status != "ToDo") {
						dataFim = getDateFormatDDMMYY(getDataFim(date, req.body.estimativa, "09", "18"));
						horaFim = getTimeFormatHHMMSS(getDataFim(hours, req.body.estimativa, "09", "18"));
						var queryDataFim = ",dataFim = str_to_date('" + dataFim + horaFim + "' ,'%d-%m-%Y %H:%i:%s')";
					}else if (req.body.oldColumn != "ToDo"  && req.body.status === "ToDo"){
						var queryDataInicio = ",dataInicio = null ";
						var queryDataFim = ",dataFim = null ";
						dataInicio = 0;
						horaInicio = 0;
						dataFim = 0;
						horaFim = 0;
					};
					
					con.query('update atividades set ' + queryStatus +   queryDataInicio + queryDataFim + 
							  ' where idAtividade = '   + idAtividade,function(err,data){
						if(err) throw err;
						data.dataInicio = dataInicio;
						data.horaInicio = horaInicio;
						data.dataFim = dataFim;
						data.horaFim = horaFim;
		   				res.end( JSON.stringify(data));
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
		   				res.end( JSON.stringify(data));
					});
				};

				// console.log('Connection established');
			});
		});
		app.post('/crateAtividades', function(req, res){
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Create Database');
					return;
				}else{	
					var query = "";
					var atividades = req.body === undefined ? null : req.body;
					var idUsuario = 0;
					for (var i = 0; i < atividades.length; i++) {
						idUsuario = atividades[i].participantes.selected === null? 0: atividades[i].participantes.selected.idUsuario;
						query += "(" + atividades[i].idAtividade + "," +  atividades[i].idHistoria + "," + 
								 idUsuario + ",'ToDo'," +
								 atividades[i].idSprint + ",'" + atividades[i].nome + "'," +  atividades[i].estimativas.selected +
								 ",'" + atividades[i].descricao + "','" + atividades[i].prioridades.selected + "', 'green')";
						if ((i + 1) < atividades.length) {
							query += ",";
						}
					};
					console.log(query);
					con.query('insert into atividades (idAtividade,idHistoria,idParticipante,status,idSprint,'+ 
							  'nome, duracao,descricao, prioridade, flag)values' + query ,function(err,data){

							  // 'on duplicated key update idHistoria = values(idHistoria),' +
							  // 'idParticipante = values(idParticipante), idSprint = values(idSprint),' + 
							  // 'nome = values(nome), duracao = values(duracao), descricao = values(descricao), prioridade = values(prioridade)'
						if(err) throw err;
						console.log(data);
						console.log(query);
		   				res.end( JSON.stringify(data));
					});
				};

				// console.log('Connection established');
			});
		});
		app.post('/getAtividadesSprintBacklog', function (req, res) {
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
					var idHistoria = req.body.idHistoria === undefined ? 0 : req.body.idHistoria;

					con.query('select * from atividades where idHistoria = ' + idHistoria +
						 	  ' and status = "ToDo"',function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};

				// console.log('Connection established');
			});
		});
		app.post('/getTesteAceitacao', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Historia Database');
					return;
				}else{	
					var idHistoria = req.body.idHistoria === (undefined || null) ? 0 : req.body.idHistoria;
					con.query('select * from testeAceitacao where idHistoria = ' + idHistoria +
							  ' ORDER by idTeste',function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/deleteTesteAceitacao', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Historia Database');
					return;
				}else{	
					var idTeste = req.body.idTeste === (undefined || null) ? 0 : req.body.idTeste;
					con.query('delete from testeAceitacao where idTeste = ' + idTeste,function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/createTesteAceitacao', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Historia Database');
					return;
				}else{
					var idHistoria = req.body.idHistoria === (undefined || null) ? 0 : req.body.idHistoria;
					var acao = req.body.acao === (undefined || null) ? "" : req.body.acao;
					var resultado = req.body.resultado === (undefined || null) ? 0 : req.body.resultado;
					con.query('insert into testeAceitacao (idHistoria,acao,resultado) value(' + idHistoria + ',"' +
							  acao + '","' + resultado + '")',function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		function getDataFim(date, estimativa, horaTrabInicio, horaTrabFim){
			var horasTrab = 0;
			if ((getHora(date) + estimativa) > horaTrabFim){
				console.log("modificação de data errada");
				horasTrab = horaTrabFim - getHora(date);
				console.log("---");
				date.setDate(getDia(date) + 1);
				date.setHours(horaTrabInicio + Math.abs(horasTrab - estimativa));
			}else{
				date.setHours(date.getHours() + estimativa);
			};
			return date;
		};
		function getMes (date) {
			var month = date.getMonth() + 1;
    		return month < 10 ? '0' + month : '' + month; 
		};
		function getDia (date) {
			var day = date.getDate();
    		return day < 10 ? '0' + day : '' + day; 
		};
		function getHora (date) {
			var hour = date.getHours();
    		return hour < 10 ? '0' + hour : '' + hour; 
		};
		function getMinutes (date) {
			var minutes = date.getMinutes();
    		return minutes < 10 ? '0' + minutes : '' + minutes; 
		};
		function getSeconds (date) {
			var seconds = date.getSeconds();
    		return seconds < 10 ? '0' + seconds : '' + seconds; 
		};
		function getDateFormatDDMMYY(date){
			return getDia(date) + '-' + getMes(date) + '-' + date.getFullYear();
			// database[i].month = date.getMonth() + 1;
			// database[i].day = date.getDate();
			// database[i].hours = date.getHours();
			// database[i].year = date.getFullYear();
		};
		function getTimeFormatHHMMSS(time) {
			// fdsfs
			// fdsfs
			return getHora(time) + ':' + getMinutes(time) + ':' + getSeconds(time);
		};
		function getFlagKanban (horaTrabInicio, horaTrabFim, dataInicioAtiv, dataFimAtiv, duracaoAtiv) {
			// Calcular duração real da atividade
			var duracaoTotAtiv;
			var actualDate = new Date();
			// var dateAtivDiff = getConvDateDiff(dataInicioAtiv, dataFimAtiv);
			var dateAtivDiff = getConvDateDiff(dataInicioAtiv, actualDate);
			if(dataInicioAtiv < dataFimAtiv){
				var diasTrab = dateAtivDiff.days;
				var count = 1;
				if (dateAtivDiff.days === 0) {
					// duracaoTotAtiv = dataFimAtiv.getHours() - horaTrabInicio;
					duracaoTotAtiv = actualDate.getHours() - dataInicioAtiv.getHours();
				}else{
					duracaoTotAtiv = horaTrabFim - dataInicioAtiv.getHours() ;	
				};
				// console.log(duracaoTotAtiv);
				while(count < diasTrab){
					if((count + 1) === diasTrab){
						duracaoTotAtiv += dataFimAtiv.getHours() - horaTrabInicio;
					}else{
						duracaoTotAtiv += horaTrabFim - dataInicioAtiv.getHours();
					}
					count++; 
				}
				// console.log(duracaoTotAtiv);
			}else{
				duracaoTotAtiv = dataFimAtiv.getHours() - dataInicioAtiv.getHours();
				// console.log(duracaoTotAtiv);
			};
			// Calcular flag Kanban
			if(duracaoTotAtiv > duracaoAtiv){
				// console.log("red");
				return "red";
			}else{
				if( Math.abs(100 - ((100 * duracaoTotAtiv) / duracaoAtiv)) < 25 ){
				// console.log("yellow");
					return "yellow";
				}else{
				// console.log("green");
					return "green";
				}
			};
		};
		function getConvDateDiff (dataInicio, dataFim) {
			//Get 1 day in milliseconds
			// var one_day = 1000 * 60 * 60 * 24;
			var date = {};

			// Convert both dates to milliseconds
			var date1_ms = dataInicio.getTime();
			var date2_ms = dataFim.getTime();
			// Calculate the difference in milliseconds
			var difference_ms = date2_ms - date1_ms;
			//take out milliseconds
			difference_ms = difference_ms/1000;
			date.seconds = Math.floor(difference_ms % 60);
			difference_ms = difference_ms/60; 
			date.minutes = Math.floor(difference_ms % 60);
			difference_ms = difference_ms/60; 
			date.hours = Math.floor(difference_ms % 24);  
			date.days = Math.floor(difference_ms/24);

			return date;
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