angular.module('demo').controller('TabsActCtrl', function ($scope, $window,  $uibModal, $log, historias, participantes) {

    // $scope.dialog = {};
    $scope.item = {};
    $scope.status = null;
    $scope.selected = null;
    $scope.dialogHide = true;
    $scope.animationsEnabled = true;
    $scope.participantes = {};
    $scope.historia = null;
    $scope.estimativa = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8
    ];
    $scope.prioridade =[
    "Alta",
    "Média",
    "Baixa"
    ];  
    $scope.atividades = [{ 
        // title:'Atividade 1', 
        // content: {
            idAtividade: null,
            idSprint: 1,
            idHistoria: null,
            nome: "Atividade 1",
            prioridades: {
                selected: null,
                options: $scope.prioridade
            },
            participantes: null,
            estimativas:{
                selected: null,
                options: $scope.estimativa
            },
            descricao: null
        // } 
    }];

    participantes.success(function(data) {
        $scope.participantes = data;
        $scope.atividades[0].participantes = {
            selected: null,
            options: $scope.participantes
        };
        console.log($scope.atividades);
    });  

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
                prioridades: {
                    selected: null,
                    options: $scope.prioridade
                },
                participantes: {
                    selected: null,
                    options: $scope.participantes
                },
                estimativas:{
                    selected: null,
                    options: $scope.estimativa
                },
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
                },
                alerts: function(){
                    return $scope.alerts;
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

angular.module('demo').controller('ModalAtividadeCtrl', function ($scope, $uibModalInstance, items, atividades, alerts) {
    $scope.dialog = items;
    $scope.save = function (activs) {
        for (var i = 0; i < activs.length; i++) {
            activs[i].idHistoria = items.historia.idHistoria;
        };
        console.log(activs);
        atividades.create(activs).success(function(data) {
            alerts.push({
                type: 'success', msg: 'Atividades adicionadas ao Sprint'
            });
        });
        $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});