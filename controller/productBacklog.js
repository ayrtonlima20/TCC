angular.module("demo").controller("ProductBacklogCtrl", function($scope, historias, testeAceitacao) {
	$scope.fields = {
		"idHistoria": null,
		"historia": null,
		"prioridade": null,
		"esforco": null,
		"descricao":null,
		"status": 'criar'
	};
	$scope.historias = {
	};
	$scope.fields.prioridade = {
		"selected": null,
		"options":[
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8,
			9,
			10
		]
	};
	$scope.fields.esforco = {
		"selected": null,
		"options":[
			10,
			20,
			30,
			40,
			50,
			60,
			70,
			80,
			90,
			100
		]
	};

	historias.get().success(function(data) {
		// for (var i = 0; i < data.length; i++) {
		// 	$scope.historias.options.push({idHistoria:data[i].idHistoria,nome:data[i].nome});
		// }
		$scope.historias = data;
		// $scope.historias.selected = $scope.historias.options[0];
		// $scope.fillTestes($scope.historias.selected.idHistoria);
	});

	$scope.criarHistoria = function(fields){
		var historia = {
			"nome": fields.historia,
			"prioridade": fields.prioridade.selected,
			"esforco": fields.esforco.selected,
			"descricao": fields.descricao
		};
		historias.create(historia).success(function(data) {
			historias.get().success(function(data) {
				$scope.historias = data;
			});
		});
	};	
	$scope.editarHistoria = function(historia){
		$scope.fields.idHistoria = historia.idHistoria;
		$scope.fields.historia = historia.nome;
		$scope.fields.descricao = historia.descricao;
		$scope.fields.prioridade.selected = historia.prioridade;
		$scope.fields.esforco.selected = historia.esforco;
		$scope.fields.status = "editar";
	};
	$scope.editar = function(fields){
		var historia = {
			"idHistoria": fields.idHistoria,
			"nome": fields.historia,
			"prioridade": fields.prioridade.selected,
			"esforco": fields.esforco.selected,
			"descricao": fields.descricao
		};
		historias.editar(historia).success(function(data) {
			historias.get().success(function(data) {
				$scope.historias = data;
				$scope.cancelar();
			});
		});
	};
	$scope.cancelar = function(){
		$scope.fields.historia = null;
		$scope.fields.descricao = null;
		$scope.fields.prioridade.selected = null;
		$scope.fields.esforco.selected = null;
		$scope.fields.status = "criar";
	};
	// $scope.excluirTeste = function(idTeste){
	// 	testeAceitacao.delete(idTeste).success(function(data) {
 //            var index = $("[taskID='" + idTeste + "']").children().attr('index');
 //            $scope.testesAceitacao.splice(index,1);
	// 	});
	// };
	// $scope.fillTestes = function(idHistoria){
	// 	console.log(idHistoria);
	// 	testeAceitacao.get(idHistoria).success(function(data) {
	// 		$scope.testesAceitacao = data;
	// 	});
	// };

});
