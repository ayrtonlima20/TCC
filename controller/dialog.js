// angular.module('demo', ['ngAnimate', 'ui.bootstrap']);  
angular.module('demo').controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

  $scope.items = ['item1', 'item2', 'item3'];
  $scope.selected = null;
  $scope.animationsEnabled = true;

  $scope.open = function (selected,size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'view/dialog.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          $scope.selected = selected;
          return $scope.selected;
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

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('demo').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
  $scope.selected = items;

  $scope.ok = function () {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});