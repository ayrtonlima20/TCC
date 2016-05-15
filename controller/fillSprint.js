angular.module("demo").controller("FillSprintCtrl", function($scope, forecast) {
	
	$scope.table = {
		"selected":null,
		"lists":{
			"table1":[{
				name:"Trident", 
				endereco:"mudou",
				telefone:"12346"
			},{
				name:"Ayrton", 
				endereco:"endereçador",
				telefone:"321"
			},{
				name:"Bla", 
				endereco:"endereçado",
				telefone:"456"
			}],
			"table2":[{
				name:"Tridaaaent", 
				endereco:"mudou",
				telefone:"12346"
			},{
				name:"Ayraaaton", 
				endereco:"endereçador",
				telefone:"321"
			},{
				name:"Blaaa", 
				endereco:"endereçado",
				telefone:"456"
			}]
		}
	};	
});
// lembrar que -- ele da o splice no index pegando na linha a tabela, pegando o objeto 1,
// exemplo, estou dando loop na table1. Ai ele vai pegar table1.splice($index, 1), nesse caos se o 
// index for 3, ele vai pegar a posição 3 que contem name bla. 