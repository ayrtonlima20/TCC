angular.module("demo").controller("LicoesAprendidasCtrl", function($scope, $uibModal, $log, licoesAprendidas) {
	$scope.historias = {
		selected:null,
		options:[]
	};
	$scope.atividades = {
		selected:null,
		options:[]
	};
	$scope.apontamentos = [];
	$scope.fields = {
		apontamento: ""
	};
	$scope.licoes = [];



	licoesAprendidas.get().success(function(data) {
		$scope.licoes = data;
		console.log(data);
	});

	$scope.openDialogCriarLicao = function (size) {
		console.log("123123");
	    var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'view/dialogLicoesAprendidas.html',
			controller: 'DialogLicoesAprendidas',
			size: size,
			resolve: {
				items: function () {

					return $scope.dialog;
				},
				alerts: function(){
					return $scope.alerts;
				}
			}
		});

	  	modalInstance.result.then(function (novaLicao) {
			$scope.licoes.push(novaLicao);
	    }, function () {
			$log.info('Modal dismissed at: ' + new Date());
	    });
  	};	



	// $scope.adicionarApontamento = function(fields, idAtividade, idHistoria){
	// 	apontamento.create(idHistoria, idAtividade, fields.apontamento).success(function(data) {
	// 		console.log(data);
	// 	 	apontamento.get(data.insertId).success(function(apon) {
	//  			 console.log(apon);
	//  			$scope.apontamentos.push({
	//  				idApontamento: data.insertId,
	//  				idHistoria: apon[0].idHistoria,
	//  				idAtividade: apon[0].idAtividade,
	//  				atividade: apon[0].atividade,
	//  				apontamento: apon[0].apontamento
	//  			});
	//  			// console.log(apon);
	//  			// console.log('-----------');
	// 	 		// // $scope.apontamentos = data;
	// 	 		// atividades.getAtividade(idAtividade).success(function(data){
	// 	 		// 	$scope.apontamentos[$scope.apontamentos.length -1].atividade = data[0].nome;
	// 	 		// 	// $scope.apontamentos[0].atividade = data[0].nome;
	// 	 		// 	console.log($scope.apontamentos);
	// 	 		// });
	// 	 	});
	// 	});
	// };	
	// $scope.excluirTeste = function(idTeste){
	// 	testeAceitacao.delete(idTeste).success(function(data) {
 //            var index = $("[taskID='" + idTeste + "']").children().attr('index');
 //            $scope.testesAceitacao.splice(index,1);
	// 	});
	// };
	// $scope.excluirApontamento = function(idApontamento){
	// 	apontamento.delete(idApontamento).success(function(data) {
 //            var index = $("[taskID='" + idApontamento + "']").children().attr('index');
 //            $scope.apontamentos.splice(index,1);
	// 	});
	// };
	// $scope.fillTestes = function(idHistoria){
	// 	console.log(idHistoria);
	// 	testeAceitacao.get(idHistoria).success(function(data) {
	// 		$scope.testesAceitacao = data;
	// 	});
	// };
	// $scope.fillApontamentos = function(idHistoria, idAtividade){
	// 	apontamento.getApontamentos(idHistoria, idAtividade).success(function(data) {
	// 		$scope.apontamentos = data;
	// 	});
	// };
	// $scope.getAtividades = function(idHistoria){
	// 	atividades.getAtividades(idHistoria).success(function(data) {
	// 		$scope.atividades = {
	// 			selected:null,
	// 			options:[]
	// 		};
	// 		for (var i = 0; i < data.length; i++) {
	// 			$scope.atividades.options.push({idAtividade:data[i].idAtividade,nome:data[i].nome});
	// 		}
	// 		console.log($scope.atividades.options[0]);
	// 		$scope.atividades.selected = $scope.atividades.options[0];
	// 		$scope.fillApontamentos($scope.historias.selected.idHistoria, $scope.atividades.selected.idAtividade);
	// 	});
	// 	return $scope.atividades;
	// };

});
