angular.module("demo").controller("KanbanController", function($scope, atividades, sprint) {

    $scope.dataAmazon = null;   
    // $scope.models = {
    //     selected: null,
    //     lists: {
    //         "ToDo": [{
    //                 id:"1",
    //                 nome:"Atividade 1",
    //                 duracao:"4",
    //                 flag:"ok"
    //             },{
    //                 id:"2",
    //                 nome:"Atividade 2",
    //                 duracao:"5",
    //                 flag:"ok"
    //             },{
    //                 id:"3",
    //                 nome:"Atividade 3",
    //                 duracao:"6",
    //                 flag:"ok"
    //             }
    //         ], 
    //         "Doing": [{
    //                 id:"4",
    //                 nome:"Atividade 4",
    //                 duracao:"7",
    //                 flag:"error"
    //             },{
    //                 id:"5",
    //                 nome:"Atividade 5",
    //                 duracao:"8",
    //                 flag:"error"
    //             },{
    //                 id:"6",
    //                 nome:"Atividade 6",
    //                 duracao:"1",
    //                 flag:"error"
    //             }
    //         ], 
    //         "Testing":[{
    //                 id:"7",
    //                 nome:"Atividade 7",
    //                 duracao:"2",
    //                 flag:"warn"
    //             },{
    //                 id:"8",
    //                 nome:"Atividade 8",
    //                 duracao:"3",
    //                 flag:"warn"
    //             },{
    //                 id:"9",
    //                 nome:"Atividade 9",
    //                 duracao:"4",
    //                 flag:"warn"
    //             }
    //         ], 
    //         "Done":[{
    //                 id:"10",
    //                 nome:"Atividade 10",
    //                 duracao:"5",
    //                 flag:"ok"
    //             },{
    //                 id:"11",
    //                 nome:"Atividade 11",
    //                 duracao:"6",
    //                 flag:"ok"
    //             },{
    //                 id:"12",
    //                 nome:"Atividade 12",
    //                 duracao:"7",
    //                 flag:"ok"
    //             }
    //         ]}
    // };
    // Generate initial model
    // for (var i = 1; i <= 3; ++i) {
    //     $scope.models.lists.ToDo.push({label: "Item A " + i});
    //     $scope.models.lists.Doing.push({label: "Item B " + i});
    // }
    // Model to JSON for demo purpose
    // $scope.$watch('models', function(model) {
    //     $scope.modelAsJson = angular.toJson(model, true);
    // }, true);
    sprint.success(function(data) {
        $scope.sprint = data[0];
        console.log(data[0]);

    });
    atividades.get().success(function(data) {
        $scope.dataAmazon = data;
        $scope.$watch('models', function(model) {
            $scope.modelAsJson = angular.toJson($scope.dataAmazon, true);
            // $scope.modelAsJson = angular.toJson($scope.models, true);
        $scope.models = $scope.dataAmazon;    
        }, true);
    });
});
