angular.module("demo").controller("TesteAceitacao", function($scope, historias, testeAceitacao) {
	$scope.historias = {
		selected:null,
		options:[]
	};
	$scope.testesAceitacao = [];
	$scope.fields = {
		acao: "",
		resultado: ""
	};

	historias.get().success(function(data) {
		for (var i = 0; i < data.length; i++) {
			$scope.historias.options.push({idHistoria:data[i].idHistoria,nome:data[i].nome});
		}
		$scope.historias.selected = $scope.historias.options[0];
		$scope.fillTestes($scope.historias.selected.idHistoria);
	});

	$scope.adicionarTeste = function(fields, idHistoria){
		var teste = {
			idTeste: null,
			idHistoria: idHistoria,
			acao: fields.acao,
			resultado: fields.resultado
		};
		testeAceitacao.create(teste).success(function(data) {
			testeAceitacao.get(idHistoria).success(function(data) {
				console.log($scope.testesAceitacao);
				$scope.testesAceitacao = data;
				console.log($scope.testesAceitacao);
			});
		});
	};	
	$scope.excluirTeste = function(idTeste){
		testeAceitacao.delete(idTeste).success(function(data) {
            var index = $("[taskID='" + idTeste + "']").children().attr('index');
            $scope.testesAceitacao.splice(index,1);
		});
	};
	$scope.fillTestes = function(idHistoria){
		console.log(idHistoria);
		testeAceitacao.get(idHistoria).success(function(data) {
			$scope.testesAceitacao = data;
		});
	};

});
