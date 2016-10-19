angular.module("demo").controller("FillSprintCtrl", function($scope, historias,sprint) {
	$scope.historias = {};
	// $scope.table = {
	// 	selected:null,
	// 	historias:{
	// 		"ProductBacklog":[{
	// 			nome:"História 1", 
	// 			prioridade:"mudou",
	// 			esforco:"12346"
	// 		},{
	// 			nome:"História 2", 
	// 			prioridade:"endereçador",
	// 			esforco:"321"
	// 		},{
	// 			nome:"História 3", 
	// 			prioridade:"endereçado",
	// 			esforco:"456"
	// 		}],
	// 		"SprintBacklog":[{
	// 			nome:"História 4", 
	// 			prioridade:"mudou",
	// 			esforco:"12346"
	// 		},{
	// 			nome:"História 5", 
	// 			prioridade:"endereçador",
	// 			esforco:"321"
	// 		},{
	// 			nome:"História 6", 
	// 			prioridade:"endereçado",
	// 			esforco:"456"
	// 		}]
	// 	}
	// };
    $scope.alerts = [];
	historias.get().success(function(data) {
    	$scope.table = {
			selected:null,
			historias:{
				"ProductBacklog": [],
				"SprintBacklog": []
			}
		};
		for (var i = 0; i < data.length; i++) {
			if (data[i].status === "SprintBacklog"){
				$scope.table.historias["SprintBacklog"].push(data[i]);
			}else{
				$scope.table.historias["ProductBacklog"].push(data[i]);
			};
		}
	});	
   $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
    $scope.setStatusHistoria = function(historia){
        setTimeout(function(){	
            var oldColumn = historia.status;
            var newColumn = $("[histID='" + historia.idHistoria + "']").parent().attr('nameHist');
            var index = $("[histID='" + historia.idHistoria + "']").children().attr('index');
            if (newColumn != oldColumn){
            	var setHistoria = {
            		idHistoria: historia.idHistoria,
            		status: newColumn
            	};
                historias.updateStatus(setHistoria).success(function(data) {
                    $scope.table.historias[newColumn][index].status = newColumn;
                });
            };
        }, 100);
    };
    $scope.gerarSprint = function(historias){
    	var ativo = $scope.getSprintActive();
    	// gerar alerta de erro caso ja exista sprint ativo
    	if (ativo = true) {
    		// erro
    	}else{
    		// continua
    	}
    };
    $scope.getSprintActive = function(){
    	var result = null;
    	sprint.getAtivo().success(function(data){
    		result = true;
    	}).error(function(data){
    		result = false;
    	});
    	return result;
    };
});