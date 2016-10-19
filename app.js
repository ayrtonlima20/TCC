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
					con.query(" SELECT act.*, user.nome as participante, user.foto, hist.nome as historia" +  
							  "     FROM atividades as act" +
							  "		INNER JOIN historias as hist ON hist.idHistoria = act.idHistoria" +
							  "		LEFT JOIN usuarios as user ON user.idUsuario = act.idParticipante"+
							  "		INNER JOIN sprint ON sprint.idSprint = act.idSprint"+
							  "		WHERE sprint.active = 'X'" + 
							  "		ORDER BY idAtividade",function(err,data){
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
							if (data[i].status == "Done") {
								dataFim = new Date(data[i].dataFim);
								data[i].dataFim = getDateFormatDDMMYY(dataFim);
								data[i].horaFim = getTimeFormatHHMMSS(dataFim);
							}else{
								dataFim = new Date(dataInicio);
								dataFim.setHours(parseInt(getHora(dataFim)) + data[i].duracao);
								data[i].dataFim = getDateFormatDDMMYY(dataFim);
								data[i].horaFim = getTimeFormatHHMMSS(dataFim);
							};
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
			});
		});
		app.get('/listAssuntos', function (req, res) {
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
					con.query('SELECT * FROM assuntos',function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data) );
					});
				};
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
		app.post('/setStatusTeste', function (req, res) {
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
					console.log(req.body);
					var idTeste = req.body.idTeste === undefined || req.body.idTeste === null? 0 : req.body.idTeste;
					var status = req.body.status === undefined || req.body.status === null? "" : req.body.status;
					console.log(idTeste);
					console.log(status);
					con.query('update testeAceitacao set status = "' + status +
						'" where idTeste = '+ idTeste ,function(err,data){
							console.log(data);
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/editarHistoria', function (req, res) {
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
					var historia = req.body === undefined ? null : req.body;
					con.query('update historias set nome = "' + historia.nome + '", prioridade = ' + historia.prioridade +
						', esforco = ' + historia.esforco + ', descricao = "' + historia.descricao + '"' +
						' where idHistoria = ' + historia.idHistoria,function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/setReleaseHistoria', function (req, res) {
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
					var idRelease = req.body.idRelease === undefined ? null : req.body.idRelease;
					con.query('update historias set idRelease = "' + idRelease +
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
					var atividades = [];
					if (req.body.constructor === Array){
						atividades = req.body;
					}else{
						atividades[0] = req.body;
					};
					console.log(atividades);
					for (var i = 0; i < atividades.length; i++) {
						var idAtividade = atividades[i].idAtividade === undefined || atividades[i].idAtividade ===  null ? 0 : atividades[i].idAtividade;
						var idParticipante = atividades[i].idParticipante === undefined || atividades[i].idParticipante ===  null ? 0 : atividades[i].idParticipante;
						var idHistoria = atividades[i].idHistoria === undefined || atividades[i].idHistoria ===  null ? 0 : atividades[i].idHistoria;
						var nome = atividades[i].nome === undefined || atividades[i].nome ===  null ? "" : atividades[i].nome;
						var duracao = atividades[i].duracao === undefined || atividades[i].duracao ===  null ? 8 : atividades[i].duracao;
						var descricao = atividades[i].descricao === undefined || atividades[i].descricao ===  null ? "" : atividades[i].descricao;
						var bloqueada = atividades[i].bloqueada === null || atividades[i].bloqueada === undefined  ? "" : atividades[i].bloqueada;
						var prioridade = atividades[i].prioridade === undefined || atividades[i].prioridade ===  null  ? 0 : atividades[i].prioridade;
						
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
				};
			});
		});
		app.post('/setImpedimento', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Atividades Database');
					return;
				}else{	
					var idAtividade = req.body.idAtividade === undefined || req.body.idAtividade === null ? 0 : req.body.idAtividade;
					var impedimento = req.body.impedimento === undefined || req.body.impedimento === null ? "" : req.body.impedimento;
					var bloqueada = req.body.bloqueada === undefined || req.body.bloqueada === null ? "" : req.body.bloqueada;

					con.query('update atividades set impedimento = "' + impedimento + 
						'", bloqueada = "' + bloqueada + '" where idAtividade = ' + idAtividade,function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
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
					var queryFlag = req.body.flag === (undefined || null) ? "" : ' ,flag = "' + req.body.flag + '"';
					// if (req.body.oldColumn === "ToDo"  && req.body.status != "ToDo"){
					// 	dataInicio = getDateFormatDDMMYY(date);
					// 	horaInicio = getTimeFormatHHMMSS(date);
					// 	dataFim = getDateFormatDDMMYY(getDataFim(date, req.body.estimativa, "09", "18"));
					// 	horaFim = getTimeFormatHHMMSS(getDataFim(hours, req.body.estimativa, "09", "18"));
					// 	var queryDataInicio = ",dataInicio = str_to_date('" + dataInicio + horaInicio + "' ,'%d-%m-%Y %H:%i:%s')";
					// 	var queryDataFim = ",dataFim = str_to_date('" + dataFim + horaFim + "' ,'%d-%m-%Y %H:%i:%s')";
					// }else if(req.body.status === "Done"){
					// 	dataFim = getDateFormatDDMMYY(date);
					// 	horaFim = getTimeFormatHHMMSS(hours);
					// 	var queryDataFim = ",dataFim = str_to_date('" + dataFim + horaFim + "' ,'%d-%m-%Y %H:%i:%s')";
					// }else if (req.body.oldColumn === "Done"  && req.body.status != "Done" && req.body.status != "ToDo") {
					// 	dataFim = getDateFormatDDMMYY(getDataFim(date, req.body.estimativa, "09", "18"));
					// 	horaFim = getTimeFormatHHMMSS(getDataFim(hours, req.body.estimativa, "09", "18"));
					// 	var queryDataFim = ",dataFim = str_to_date('" + dataFim + horaFim + "' ,'%d-%m-%Y %H:%i:%s')";
					// }else if (req.body.oldColumn != "ToDo"  && req.body.status === "ToDo"){
					// 	var queryDataInicio = ",dataInicio = null ";
					// 	var queryDataFim = ",dataFim = null ";
					// 	dataInicio = 0;
					// 	horaInicio = 0;
					// 	dataFim = 0;
					// 	horaFim = 0;
					// };
					if (req.body.oldColumn === "ToDo"  && req.body.status != "ToDo" && req.body.status != "Done"){
						dataInicio = getDateFormatDDMMYY(date);
						horaInicio = getTimeFormatHHMMSS(date);
						// dataFim = getDateFormatDDMMYY(getDataFim(date, req.body.estimativa, "09", "18"));
						// horaFim = getTimeFormatHHMMSS(getDataFim(hours, req.body.estimativa, "09", "18"));
						var queryDataInicio = ",dataInicio = str_to_date('" + dataInicio + horaInicio + "' ,'%d-%m-%Y %H:%i:%s')";
						// var queryDataFim = ",dataFim = str_to_date('" + dataFim + horaFim + "' ,'%d-%m-%Y %H:%i:%s')";
					}else if(req.body.status === "Done"){
						if (req.body.oldColumn === "ToDo") {
							dataInicio = getDateFormatDDMMYY(date);
							horaInicio = getTimeFormatHHMMSS(date);
							var queryDataInicio = ",dataInicio = str_to_date('" + dataInicio + horaInicio + "' ,'%d-%m-%Y %H:%i:%s')";
						}
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
					con.query('update atividades set ' + queryStatus +   queryDataInicio + queryDataFim + queryFlag +
							  ' where idAtividade = '   + idAtividade,function(err,data){
						if(err) throw err;
						data.dataInicio = dataInicio;
						data.horaInicio = horaInicio;
						data.dataFim = dataFim;
						data.horaFim = horaFim;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/finalizarSprint', function (req, res) {
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
					var done = req.body === (undefined || null) ? [] : req.body;
					var queryWhere = "";
					for (var i = 0; i < done.length; i++) {
						if (i === 0) {
							queryWhere += ' act.idHistoria in (' + done[i][0].idHistoria;
						}else{
							queryWhere += ',' + done[i][0].idHistoria;
						}
					};
					queryWhere += ')';
					con.query(' select act.idAtividade, act.nome as atividade, act.idHistoria, hist.nome as historia from atividades as act ' + 
							  ' inner join historias as hist on hist.idHistoria = act.idHistoria ' +
							  ' inner join sprint on sprint.idSprint = act.idSprint and sprint.active = "X" ' +
							  ' where ' + queryWhere + ' order by act.idHistoria, act.idAtividade',function(err,data){//order by act.idHistoria, act.idAtividade
						if(err) throw err;
						
				        var hists = [];
				        var select = [];
				        var notfound = [];
				        var notfoundIds = []; 
				        var found = false;
				        var upd = [];
				        var queryHist = "";
				        var queryAct = "";
				        // monta um array dos selects para poder comparar com o que vem do sprint
				        for (var i = 0; i < data.length; i++) {
				            if (hists.indexOf(data[i].idHistoria) === -1) {
				                hists.push(data[i].idHistoria);
				                select[select.length] = [];
				                for (var j = 0; j < data.length; j++) {
				                    if (data[i].idHistoria === data[j].idHistoria) {
				                        select[select.length - 1].push({
				                            "idHistoria": data[j].idHistoria,
				                            "idAtividade": data[j].idAtividade
				                        });
				                    };
				                };
				            };
				        };
				        //loop no retorno do select para comparar se tudo o que veio da coluna do sprint(done) está feito
				        // e pode ser considerado a historia como terminada
				        for (var i = 0; i < select.length; i++) {
				        	for (var j = 0; j < done.length; j++) {
				        		if (select[i][0].idHistoria === done[j][0].idHistoria) {
				        			for (var x = 0; x < select[i].length; x++) {
					        			for (var y = 0; y < done[j].length; y++) {
					        				if (select[i][x].idAtividade === done[j][y].idAtividade) {
					        					found = true;
					        					break;
					        				}
					        			}
					        			if (!found) {
				        					notfound.push({
				        						idAtividade:select[i][x].idAtividade,
				        						idHistoria:select[i][x].idHistoria
				        					});
				        					notfoundIds.push(select[i][x].idHistoria);
					        			}
					        			found = false;
				        			}
				        			break;
				        		}
				        	}
				        }
	        			for (var i = 0; i < done.length; i++) {
	        				if (notfoundIds.indexOf(done[i][0].idHistoria) === -1) {
								if (i === 0) {
									queryHist += ' idHistoria in (' + done[i][0].idHistoria;
								}else{
									queryHist += ',' + done[i][0].idHistoria;
								}
			        			for (var j = 0; j < done[i][j].length; j++) {
									if (j === 0) {
										queryAct += ' idAtividade in (' + done[i][j].idAtividade;
									}else{
										queryAct += ',' + done[i][j].idAtividade;
									}
			        			}
	        				}
	        			}
	        			console.log("teste");
	        			if (queryHist != "") {
	        				queryHist += ')';	
	        			}
	        			if (queryAct != "") {
	        				queryAct += ')';	
	        			}
	        			console.log(queryAct);
	        			console.log(queryHist);
				        console.log("notfound",notfound);
		   				res.end( JSON.stringify(data));
					});
				};
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
			});
		});
		app.post('/createAtividades', function(req, res){
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
					var dataAtual = new Date();
					var dataUpd = null;
					var idUsuario = 0;
					for (var i = 0; i < atividades.length; i++) {
						idUsuario = atividades[i].participantes.selected === null? 0: atividades[i].participantes.selected.idUsuario;
						query += "(" + atividades[i].idAtividade + "," +  atividades[i].idHistoria + ",'ToDo'," +
								 atividades[i].idSprint + ",'" + atividades[i].nome + "'," +  atividades[i].estimativas.selected +
								 ",'" + atividades[i].descricao + "', str_to_date('" + getDateFormatDDMMYY(dataAtual) +  
								 getTimeFormatHHMMSS(dataAtual) + "' ,'%d-%m-%Y %H:%i:%s')" +
								 ",'" + atividades[i].prioridades.selected + "', 'green')";
						if ((i + 1) < atividades.length) {
							query += ",";
						}
					};
					con.query('insert into atividades (idAtividade, idHistoria, status, idSprint,'+ 
							  'nome, duracao, descricao, dataCriacao, prioridade, flag)values' + query ,function(err,data){

							  // 'on duplicated key update idHistoria = values(idHistoria),' +
							  // 'idParticipante = values(idParticipante), idSprint = values(idSprint),' + 
							  // 'nome = values(nome), duracao = values(duracao), descricao = values(descricao), prioridade = values(prioridade)'
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/createHistoria', function(req, res){
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
					var historia = req.body === undefined ? null : req.body;
					console.log(req.body);
					query = "('" + historia.nome + "'," + historia.prioridade + "," + historia.esforco + 
							",'ProductBacklog','" + historia.descricao + "')";
					con.query('insert into historias (nome, prioridade, esforco, status, descricao)values' + query ,function(err,data){

							  // 'on duplicated key update idHistoria = values(idHistoria),' +
							  // 'idParticipante = values(idParticipante), idSprint = values(idSprint),' + 
							  // 'nome = values(nome), duracao = values(duracao), descricao = values(descricao), prioridade = values(prioridade)'
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/createRelease', function(req, res){
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
					var release = req.body === undefined ? null : req.body;
					query = "(" + release.duracao + ",'" + release.meta + "')";
					con.query('insert into releases(tempoEstimado, meta) values ' + query ,function(err,data){
							  // 'on duplicated key update idHistoria = values(idHistoria),' +
							  // 'idParticipante = values(idParticipante), idSprint = values(idSprint),' + 
							  // 'nome = values(nome), duracao = values(duracao), descricao = values(descricao), prioridade = values(prioridade)'
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/createApontamento', function(req, res){
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
					var apontamentos = req.body === undefined ? null : req.body;
					var idHistoria = apontamentos.idHistoria === undefined ? null : apontamentos.idHistoria;
					var idAtividade = apontamentos.idAtividade === undefined ? null : apontamentos.idAtividade;
					var txtApontamento = apontamentos.txtApontamento === undefined ? "" : apontamentos.txtApontamento;
					var query = "(" + idAtividade + "," + idHistoria + ",'" + txtApontamento + "')"
					con.query('insert into apontamentos (idAtividade, idHistoria, apontamento)values ' + query ,function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/createLicaoAprendida', function(req, res){
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
					var licao = req.body === undefined ? null : req.body;
					var dataAtual = new Date();
					query = "(" + "str_to_date('" + getDateFormatDDMMYY(dataAtual) +  getTimeFormatHHMMSS(dataAtual) + "' ,'%d-%m-%Y %H:%i:%s')" + 
					",'" + licao.idAssunto + "'," + licao.idUsuario + "," + licao.idProjeto + ",'" + licao.descricao + "')";
					console.log(req.body);
					con.query('insert into licoes (dataLicao, idAssunto, idUsuario, idProjeto, descricao) values ' + query ,function(err,data){

						// 'on duplicated key update idHistoria = values(idHistoria),' +
						// 'idParticipante = values(idParticipante), idSprint = values(idSprint),' + 
						// 'nome = values(nome), duracao = values(duracao), descricao = values(descricao), prioridade = values(prioridade)'
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/getLicoesAprendidas', function(req, res){
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
					con.query("SELECT licoes.*, user.nome as usuario, proj.nome as projeto, assu.nome as assunto FROM licoes " +
								"INNER JOIN usuarios as user on user.idUsuario = licoes.idUsuario " +
								"INNER JOIN projetos as proj on proj.idProjeto = licoes.idProjeto " +
								"INNER JOIN assuntos as assu on assu.idAssunto = licoes.idAssunto " ,function(err,data){

						// 'on duplicated key update idHistoria = values(idHistoria),' +
						// 'idParticipante = values(idParticipante), idSprint = values(idSprint),' + 
						// 'nome = values(nome), duracao = values(duracao), descricao = values(descricao), prioridade = values(prioridade)'
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/getApontamento', function (req, res) {
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
					var idApontamento = req.body.idApontamento === undefined ? 0 : req.body.idApontamento;
					con.query("select apt.*, hist.nome as historia, atv.nome as atividade " +
						" from apontamentos as apt " +
						" inner join atividades as atv " +
						" on atv.idAtividade = apt.idAtividade " +
						" inner join historias as hist " +
						" on hist.idHistoria = apt.idHistoria " +
						" where idApontamento = " + idApontamento, function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/getApontamentos', function (req, res) {
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
					var idHistoria = req.body.idHistoria === undefined ? 0 : req.body.idHistoria;
					console.log(idAtividade);
					console.log(idHistoria);
					con.query("select apt.*, hist.nome as historia, atv.nome as atividade " +
						" from apontamentos as apt " +
						" inner join atividades as atv " +
						" on atv.idAtividade = apt.idAtividade " +
						" inner join historias as hist " +
						" on hist.idHistoria = apt.idHistoria " +
						" where apt.idHistoria = " + idHistoria +
						" and apt.idAtividade = " + idAtividade, function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/deleteApontamento', function (req, res) {
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
					var idApontamento = req.body.idApontamento === undefined ? 0 : req.body.idApontamento;
					con.query('delete from apontamentos where idApontamento = ' + idApontamento,function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
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
			});
		});
		app.post('/getAtividades', function (req, res) {
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

					con.query('select * from atividades where idHistoria = ' + idHistoria ,function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
			});
		});
		app.post('/getAtividade', function (req, res) {
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

					con.query('select * from atividades where idAtividade = ' + idAtividade ,function(err,data){
						if(err) throw err;
		   				res.end( JSON.stringify(data));
					});
				};
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
		app.post('/getSprintBurndown', function (req, res) {
			var con = mysql.createConnection({
				host: "localhost",
			  	user: "root",
			  	password: "root",
				database: "scrum"
			});
			con.connect(function(err){
				if(err){
					console.log('Error connecting to Sprint Burndown database');
					return;
				}else{
					con.query(" SELECT act.*, sprint.dataInicio as sprintInicio, sprint.dataFim as sprintFim" +  
							  "     FROM atividades as act" +
							  "		INNER JOIN sprint ON sprint.idSprint = act.idSprint" +
							  "		WHERE sprint.active = 'X' ORDER BY dataCriacao",function(err,data){
						if(err) throw err;
						var retorno = [];	
						var dias = [];
						var sprintInicio = data[0].sprintInicio;
						var sprintFim = data[0].sprintFim;
						var dataDiff = getConvDateDiff(sprintInicio,sprintFim);
						var dataAtual = new Date();
						// for (var j = 0; j < data.length; j++) {
						// 	console.log(parseInt(getDia(data[j].dataCriacao)));
						// }
						var index = 0;
						for (var i = 0; i <= dataDiff.days; i++) {
							dias[i] = parseInt(getDia(sprintInicio)) + i;
							if (dias[i] <= parseInt(getDia(dataAtual))) {
								for (var j = index; j < data.length; j++) {
									// if (dias[i] > parseInt(getDia(data[j].dataCriacao)) && parseInt(getDia(data[j].dataCriacao)) != 0 ){
									// 	j = data.length;
									// 	if (retorno[i] === undefined) {
									// 		retorno[i] = {};
									// 		retorno[i].dia = dias[i];
									// 	}
									// }else{
									// if ((dias[i] === parseInt(getDia(data[j].dataInicio)) && 
									// 		parseInt(getDia(data[j].dataCriacao)) <= parseInt(getDia(data[j].dataInicio))) || 
									// 	(dias[i] <= parseInt(getDia(sprintInicio)) && data[j].dataInicio === null )) {//dataCriacao
									if (dias[i] === parseInt(getDia(data[j].dataCriacao)) || 
										(dias[i] === parseInt(getDia(sprintInicio)) && 
										parseInt(getDia(data[j].dataCriacao)) <= parseInt(getDia(sprintInicio)))) {//dataCriacao
										// console.log(dias[i]);
										// console.log(parseInt(getDia(data[j].dataInicio)));
										// console.log("---------------");
										if (retorno[i] === undefined) {
											retorno[i] = {};
										}
										if (retorno[i].estimativa === undefined) {
											retorno[i].estimativa = 0;
										}
										// if (parseInt(getDia(data[j].dataCriacao)) > 9) {
										// 	console.log("dia atual",dias[i]);
										// 	console.log("dia inicio",parseInt(getDia(data[j].dataInicio)));
										// 	console.log("dia criacao", parseInt(getDia(data[j].dataCriacao)));
										// 	console.log("sprint inicio", parseInt(getDia(sprintInicio)));
										// 	console.log("estimativa total",retorno[i].estimativa);
										// 	console.log("estimativa atividade",data[j].duracao);
										// 	console.log("--------------------");

										// };
										retorno[i].dia = dias[i];
										retorno[i].estimativa += data[j].duracao;
									};
									
									if (dias[i] === parseInt(getDia(data[j].dataFim))) {
										if (retorno[i] === undefined) {
											retorno[i] = {};
										}
										if (retorno[i].estimativa === undefined) {
											retorno[i].estimativa = 0;
										}
										retorno[i].dia = dias[i];
										retorno[i].estimativa -= data[j].duracao;	
									}
									// };
								}
								if (retorno[i] === undefined) {
									retorno[i] = {};
									retorno[i].dia = dias[i];
									retorno[i].estimativa = 0;
								};
								if (i > 0 ) {
									retorno[i].estimativa += retorno[i-1].estimativa;
								};
							};
							if (retorno[i] === undefined) {
								retorno[i] = {};
								retorno[i].dia = dias[i];
							};
						};	
		   				res.end(JSON.stringify(retorno));
					});
				};
			});
		});
		function getDataFim(date, estimativa, horaTrabInicio, horaTrabFim){
			var horasTrab = 0;
			if ((getHora(date) + estimativa) > horaTrabFim){
				horasTrab = horaTrabFim - getHora(date);
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
			if (date === null || date === undefined){return 0;};
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
				while(count < diasTrab){
					if((count + 1) === diasTrab){
						duracaoTotAtiv += dataFimAtiv.getHours() - horaTrabInicio;
					}else{
						duracaoTotAtiv += horaTrabFim - dataInicioAtiv.getHours();
					}
					count++; 
				}
			}else{
				duracaoTotAtiv = dataFimAtiv.getHours() - dataInicioAtiv.getHours();
			};
			// Calcular flag Kanban
			if(duracaoTotAtiv > duracaoAtiv){
				return "red";
			}else{
				if( Math.abs(100 - ((100 * duracaoTotAtiv) / duracaoAtiv)) < 25 ){
					return "yellow";
				}else{
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