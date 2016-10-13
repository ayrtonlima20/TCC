angular.module("demo").controller("ReleaseCtrl", function($scope, $uibModal, $log,historias) {
	$scope.historias = {};

	$scope.line = {
		"nome": null,
		"prioridade": null,
		"esforco": null
	};
    $scope.alerts = [];
	historias.get().success(function(data) {
    	$scope.table = {
			selected:null,
			historias:{
				"ProductBacklog": [],
				"ReleaseBacklog": []
			}
		};
		for (var i = 0; i < data.length; i++) {
			if (data[i].idRelease != null){
				$scope.table.historias["ReleaseBacklog"].push(data[i]);
			}else{
				$scope.table.historias["ProductBacklog"].push(data[i]);
			};
		};
	});	
   $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.setRelease = function(historia){
        setTimeout(function(){
            var newColumn = $("[histID='" + historia.idHistoria + "']").parent().attr('nameHist');
            var index = $("[histID='" + historia.idHistoria + "']").children().attr('index');
            if (newColumn === "ReleaseBacklog"){
            	var setHistoria = {
            		"idHistoria": historia.idHistoria,
            		"idRelease": '1'//release.idRelease
            	};
                 historias.updateRelease(setHistoria).success(function(data) {
                     // $scope.table.historias[newColumn][index].status = newColumn;
                 });
            };
        }, 100);
    };

    $scope.openDialogRelease = function (size, line) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'view/dialogCriarRelease.html',
            controller: 'DialogCriarReleaseCtrl',
            size: size,
            resolve: {
                alerts: function(){
                    return $scope.alerts;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});

angular.module('demo').controller('DialogCriarReleaseCtrl', function ($scope, $uibModalInstance, historias, alerts,releases) {
	$scope.duracao = {
		selected: 4,
		options: [
			1,
			2,
			3,
			4,
			5,
			6,
			7,
			8
		]
	};
	$scope.dialog = {
		"duracao": null,
		"meta": null
	};
    // $scope.dialog = items;
    // $scope.save = function (activs) {
    //     var activCreate = [];
    //     var activUpd = [];
    //     for (var i = 0; i < activs.length; i++) {
    //         activs[i].idHistoria = items.historia.idHistoria;
    //         if (activs[i].idAtividade === null){
    //             activs[i].idUsuario = activs[i].participantes.selected === null ? 0 : activs[i].participantes.selected.idUsuario;
    //             activs[i].duracao = activs[i].estimativas.selected === null ? 0 : activs[i].estimativas.selected;
    //             activs[i].prioridade = activs[i].prioridades.selected === null ? "" : activs[i].prioridades.selected;
    //             activCreate.push(activs[i]);
    //         }else{
    //             activs[i].idUsuario = activs[i].participantes.selected === null ? 0 : activs[i].participantes.selected.idUsuario;
    //             activs[i].duracao = activs[i].estimativas.selected === null ? 0 : activs[i].estimativas.selected;
    //             activs[i].prioridade = activs[i].prioridades.selected === null ? "" : activs[i].prioridades.selected;
    //             activUpd.push(activs[i]);
    //         };
    //     };
    //     if (activCreate.length >= 1) {
    //         atividades.create(activCreate).success(function(data) {
    //             alerts.push({
    //                 type: 'success', msg: 'Atividades adicionadas ao Sprint'
    //             });
    //         });
    //     };
    //     if(activUpd.length >= 1){
    //         atividades.update(activUpd).success(function(data) {
    //             alerts.push({
    //                 type: 'success', msg: 'Atividades Alteradas'
    //             });
    //         }); 
    //     };
    //     $uibModalInstance.dismiss('cancel');
    // };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.save = function(dialog, duracao) {
    	dialog.duracao = duracao; 
        releases.create(dialog).success(function(data) {
            alerts.push({
                type: 'success', msg: 'Release Gerado'
            });
            $uibModalInstance.close(dialog);
        });
    };
});