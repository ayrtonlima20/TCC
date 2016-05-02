angular.module("demo").controller("KanbanController", function($scope) {
    $scope.models = {
        selected: null,
        lists: {
            "ToDo": [
                {label:"Atividade 1"},
                {label:"Atividade 2"},
                {label:"Atividade 3"}
                ], 
            "Doing": [
                {label:"Atividade 4"},
                {label:"Atividade 5"},
                {label:"Atividade 6"}
            ], 
            "Testing":[
                {label:"Atividade 7"},
                {label:"Atividade 8"},
                {label:"Atividade 9"}
            ], 
            "Done":[
                {label:"Atividade 10"},
                {label:"Atividade 11"},
                {label:"Atividade 12"}
            ]}
    };
    // Generate initial model
    // for (var i = 1; i <= 3; ++i) {
    //     $scope.models.lists.ToDo.push({label: "Item A " + i});
    //     $scope.models.lists.Doing.push({label: "Item B " + i});
    // }
    // Model to JSON for demo purpose
    $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
    }, true);
});
