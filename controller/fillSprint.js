angular.module("demo").controller("FillSprintCtrl", function($scope, forecast, $uibModal, $log) {
	
	$scope.table = {
		selected:null,
		historias:{
			"productBacklog":[{
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
			"sprintBacklog":[{
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
	$scope.dialog = {};
	$scope.selected = null;
	$scope.animationsEnabled = true;

	$scope.open = function (size, item) {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'view/dialogAtividade.html',
			controller: 'ModalAtividadeCtrl',
			size: size,
			resolve: {
				items: function () {
          			// $scope.dialog.selected = $scope.models.selected;
          			$scope.dialog.selected = item;
          			$scope.dialog.dataAmazon = $scope.dataAmazon;
          			return $scope.dialog;
          		}
          	}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function () {
			$log.info('Modal dismissed at: ' + new Date());
		});
	};

	$scope.toggleAnimation = function () {
		$scope.animationsEnabled = !$scope.animationsEnabled;
	};
});

angular.module('demo').controller('ModalAtividadeCtrl', function ($scope, $uibModalInstance, items) {
	$scope.dialog = items;

	$scope.ok = function () {
		$uibModalInstance.close($scope.dialog.selected.item);
	};

	$scope.cancel = function () {
		$uibModalInstance.dismiss('cancel');
	};
});
