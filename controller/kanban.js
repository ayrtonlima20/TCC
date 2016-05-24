angular.module("demo").controller("KanbanController", function($scope, atividades, sprint) {

    $scope.dataAmazon = null;   
    sprint.success(function(data) {
        $scope.sprint = data[0];

    });
    atividades.get().success(function(data) {
        $scope.dataAmazon = data;
        $scope.$watch('models', function(model) {
            $scope.modelAsJson = angular.toJson($scope.dataAmazon, true);
            // $scope.modelAsJson = angular.toJson($scope.models, true);
            $scope.models = $scope.dataAmazon;    
        }, true);
    });
    $scope.setColumn = function(item){
        setTimeout(function(){
            var oldColumn = item.status;
            var newColumn = $("[taskID='" + item.idAtividade + "']").parent().attr('name');
            var index = $("[taskID='" + item.idAtividade + "']").children().attr('index');
            var atividade = {
                idAtividade: item.idAtividade,
                oldColumn: item.status,
                status: newColumn,
                dataInicio: item.dataInicio,
                dataFim: item.dataFim,
                estimativa: item.duracao
            };

            if (newColumn != oldColumn){
                atividades.updateStatus(atividade).success(function(data) {
                    if (data.dataInicio != null && data.dataInicio != null) {
                        $scope.models.lists[newColumn][index].dataInicio = data.dataInicio;
                        $scope.models.lists[newColumn][index].horaInicio = data.horaInicio;
                    };
                    if (data.dataFim != null && data.dataFim != null) {
                        $scope.models.lists[newColumn][index].dataFim = data.dataFim;
                        $scope.models.lists[newColumn][index].horaFim = data.horaFim;
                    };
                    $scope.models.lists[newColumn][index].status = newColumn;
                });
            };
            // for (var i = 0 ; i < column.length; i++) {
            //     if (column[i].idAtividade === item.idAtividade) {
            //         column[i].status = newColumn;
            //         i = column.length;
            //     };
            // };
        }, 100);
    };
});
