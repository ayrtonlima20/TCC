angular.module("demo").controller("FillSprintCtrl", function($scope, historias) {
	$scope.historias = {};
	// $scope.table = {
	// 	selected:null,
	// 	historias:{
	// 		"ProductBacklog":[{
	// 			name:"História 1", 
	// 			endereco:"mudou",
	// 			telefone:"12346"
	// 		},{
	// 			name:"História 2", 
	// 			endereco:"endereçador",
	// 			telefone:"321"
	// 		},{
	// 			name:"História 3", 
	// 			endereco:"endereçado",
	// 			telefone:"456"
	// 		}],
	// 		"SprintBacklog":[{
	// 			name:"História 4", 
	// 			endereco:"mudou",
	// 			telefone:"12346"
	// 		},{
	// 			name:"História 5", 
	// 			endereco:"endereçador",
	// 			telefone:"321"
	// 		},{
	// 			name:"História 6", 
	// 			endereco:"endereçado",
	// 			telefone:"456"
	// 		}]
	// 	}
	// };

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
});