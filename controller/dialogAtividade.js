angular.module('demo').controller('TabsActCtrl', function ($scope, $window,  $uibModal, $log, historias) {

    $scope.dialog = {};
    $scope.status = "XXX";
    $scope.selected = null;
    $scope.dialogHide = true;
    $scope.animationsEnabled = true;
    $scope.participantes = {};
    $scope.historia = null;

    $scope.estimativa = {
        selected: 3,
        options: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8
        ]
    };
    $scope.prioridade = {
        selected: "Média",
        options: [
        "Alta",
        "Média",
        "Baixa"
        ]
    };
    $scope.atividades = [{ 
        title:'Title 1', 
        content: {
            nome:"asd",
            participante:"aa",
            prioridade:"asda",
            estimativa:"sad",
            descricao:"asda"
        } 
    }];

    $scope.addAtividade = function() {
        $scope.atividades.push({ 
            title:'Atividade '+ ($scope.atividades.length + 1),
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

    $scope.openDialogAtividade = function (size, line) {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'view/dialogAtividade.html',
            controller: 'ModalAtividadeCtrl',
            size: size,
            resolve: {
                items: function () {
                    var indexPart = 0; 
                    var indexHist = 0; 
                    var indexEsti = 0;
                    var indexPrio = 0;
                    // $scope.dialog.selected = $scope.models.selected;
                    $scope.dialog.historia = line;
                    $scope.dialog.estimativa = $scope.estimativa;
                    $scope.dialog.prioridade = $scope.prioridade;
                    $scope.dialog.participantes = {
                        selected: null,
                        options: $scope.participantes
                    };
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
