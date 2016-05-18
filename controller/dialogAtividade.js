angular.module('demo').controller('TabsActCtrl', function ($scope, $window,  $uibModal, $log) {
    $scope.tabs = [{ 
        title:'Dynamic Title 1', 
        content: {
            nome:"asd",
            participante:"aa",
            prioridade:"asda",
            estimativa:"sad",
            descricao:"asda"
        } 
    }];

    $scope.addAtividade = function() {
        $scope.tabs.push({ 
            title:'Title'+ ($scope.tabs.length + 1),
            content: {
                nome:"",
                participante:"",
                prioridade:"",
                estimativda:"",
                descricao:""
            } 
        }); 
    };

    $scope.dialog = {};
    $scope.selected = null;
    $scope.animationsEnabled = true;

    $scope.openDialogAtividade = function (size, item) {
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
