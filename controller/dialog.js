// angular.module('demo', ['ngAnimate', 'ui.bootstrap']);  
angular.module('demo').controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {
  $scope.dialog = {};
  $scope.selected = null;
  $scope.animationsEnabled = true;

  $scope.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'view/dialog.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          $scope.dialog.selected = $scope.models.selected;
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

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('demo').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
  $scope.dialog = items;

  $scope.ok = function () {
    $uibModalInstance.close($scope.dialog.selected.item);
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});