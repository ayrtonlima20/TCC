angular.module("demo").controller("KanbanController", function($scope, atividades, sprint) {

    $scope.dataAmazon = null;   
    sprint.getAtivo().success(function(data) {
        $scope.sprint = data[0];
    });
    $scope.alerts = [];

    $scope.addAlert = function() {
        $scope.alerts.push({msg: 'Another alert!'});
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };
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
                estimativa: item.duracao,
                impedimento: item.impedimento,
                flag: item.flag
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
                    if (newColumn === "ToDo") {
                        $scope.models.lists[newColumn][index].flag = "green";
                    };
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
    $scope.finalizarSprint = function(done){
        var hist = [];
        var histDone = [];
        for (var i = 0; i < done.length; i++) {
            if ($.inArray(done[i].idHistoria, hist) === -1) {
                hist.push(done[i].idHistoria);
                histDone[histDone.length] = [];
                console.log(histDone[histDone.length - 1]);
                for (var j = 0; j < done.length; j++) {
                    if (done[i].idHistoria === done[j].idHistoria) {
                        histDone[histDone.length - 1].push({
                            "idHistoria": done[j].idHistoria,
                            "idAtividade": done[j].idAtividade
                        });
                    };
                };
            };
        };
        console.log(histDone);
        sprint.finalizarSprint(histDone).success(function(data){

        });
    };
});
