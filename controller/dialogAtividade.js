angular.module('demo').controller('TabsActCtrl', function ($scope, $window,  $uibModal, $log, historias, participantes) {

    // $scope.dialog = {};
    $scope.item = {};
    $scope.status = null;
    $scope.selected = null;
    $scope.dialogHide = true;
    $scope.animationsEnabled = true;
    $scope.participantes = {};
    $scope.historia = null;

    $scope.estimativa = {
        selected: null,
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
        selected: null,
        options: [
        "Alta",
        "Média",
        "Baixa"
        ]
    };     
    $scope.participantes = [{
        idUsuario: 1,
        nome: "Josué"
    },{
        idUsuario: 2,
        nome: "Ayrton"
    }];
    $scope.atividades = [{ 
        // title:'Atividade 1', 
        // content: {
        idAtividade: null,
        idSprint: 1,
        idHistoria: null,
        nome: "Atividade 1",
        prioridade: $scope.prioridade,
        participantes: {
            selected: $scope.participantes[0],
            options: $scope.participantes
        },
        estimativa: null,
        descricao: null
        // } 
    }];

    // participantes.success(function(data) {
    //     $scope.participantes = data;
    //     $scope.atividades[0].participantes = {
    //         selected: $scope.participantes[0],
    //         options: $scope.participantes
    //     };
    //     console.log($scope.atividades);
    // });  

    $scope.addAtividade = function() {
        $scope.atividades.push({ 
            // title:'Atividade '+ ($scope.atividades.length + 1),
            // content: {
            idAtividade: null,
            idSprint: 1,
            idHistoria: null,
            idParticipante: null,
            nome:'Atividade '+ ($scope.atividades.length + 1),
            participantes: null,
            prioridade: $scope.prioridade,
            participantes: {
                selected: $scope.participantes[0],
                options: $scope.participantes
            },
            estimativa: null,
            descricao: null
            // } 
        }); 
    };

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
                    $scope.item.historia = line;
                    $scope.item.estimativa = $scope.estimativa;
                    $scope.item.prioridade = $scope.prioridade;
                    $scope.item.participantes = {
                        selected: null,
                        options: $scope.participantes
                    };
                    return $scope.item;
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
    $scope.save = function (activs) {
        for (var i = 0; i < activs.length; i++) {
            activs[i].idHistoria = items.historia.idHistoria;
        };
        console.log("items");
        console.log(items);
        console.log("activs");
        console.log(activs);
        $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});