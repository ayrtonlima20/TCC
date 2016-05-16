angular.module("demo").controller("FillSprintCtrl", function($scope, forecast) {
	
	$scope.table = {
		selected:null,
		historias:{
			"ProductBacklog":[{
				name:"História 1", 
				endereco:"mudou",
				telefone:"12346"
			},{
				name:"História 2", 
				endereco:"endereçador",
				telefone:"321"
			},{
				name:"História 3", 
				endereco:"endereçado",
				telefone:"456"
			}],
			"SprintBacklog":[{
				name:"História 4", 
				endereco:"mudou",
				telefone:"12346"
			},{
				name:"História 5", 
				endereco:"endereçador",
				telefone:"321"
			},{
				name:"História 6", 
				endereco:"endereçado",
				telefone:"456"
			}]
		}
	};	
});