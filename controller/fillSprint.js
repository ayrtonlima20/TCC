angular.module("demo").controller("FillSprintCtrl", function($scope, historias) {
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
				"ProductBacklog": data,
				"SprintBacklog":[{
					nome:"História 4", 
					prioridade:"1",
					esforco:"10"
				},{
					nome:"História 5", 
					prioridade:"2",
					esforco:"50"
				},{
					nome:"História 6", 
					prioridade:"3",
					esforco:"100"
				}]
			}
		};
	});	
   $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
});