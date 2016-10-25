angular.module("demo").controller("FillSprintCtrl", function($scope, $location,historias,sprint, atividades) {
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
	historias.getHistSprintBacklog().success(function(data) {
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
    $scope.gerarSprint = function(){
    	var ativo = $scope.getSprintActive();
    	sprint.getAtivo().success(function(data){
            if (data.length > 0) {
                alert("Existe um sprint em andamento. Finalize um sprint para iniciar outro");
            }else{
                // chamar tela dialogGerarSprint
                var newSprint = {
                    nome: "Sprint 3", 
                    dataInicio: new Date(2016, 9, 20), 
                    dataFim: new Date(2016, 9, 30), 
                    descricao: "Sprint teste Gerar Sprint"
                };
                var ativs = null;
                atividades.getAtividadesNewSprint().success(function(data){
                    ativs = data;
                    sprint.criarSprint(newSprint).success(function(data){
                        sprint.getAtivo().success(function(data){
                            atividades.setSprintAtividade(ativs,data[0].idSprint).success(function(data){
                                // show message success
                                alert("Novo Sprint Iniciado");
                                $location.path( "kanban" );
                            });                     
                        });
                    });
                });
            }
    	}).error(function(data){
    	});
    };
    $scope.getSprintActive = function(){
    	sprint.getAtivo().success(function(data){
    		console.log(true);
    		return true;
    	}).error(function(data){
    		console.log(false);
    		return false;
    	});
    };
});