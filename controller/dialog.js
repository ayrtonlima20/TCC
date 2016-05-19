// angular.module('demo', ['ngAnimate', 'ui.bootstrap']);  
angular.module('demo').controller('ModalDemoCtrl', function ($scope, $uibModal, $log, participantes, historias, atividades) {
  $scope.dialog = {};
  $scope.status = null;
  $scope.selected = null;
  $scope.animationsEnabled = true;
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
  for (var i = 0; i < 0; i--) {
    Things[i]
  };

  participantes.success(function(data) {
    $scope.participantes = data;
  });  

  historias.success(function(data) {
    $scope.historias = data;
  });

  $scope.open = function (size, item) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'view/dialog.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          var indexPart = 0; 
          var indexHist = 0; 
          var indexEsti = 0;
          var indexPrio = 0;
          // $scope.dialog.selected = $scope.models.selected;
          $scope.dialog.selected = item;
          $scope.dialog.dataAmazon = $scope.dataAmazon;
          $scope.dialog.estimativa = $scope.estimativa;
          $scope.dialog.prioridade = $scope.prioridade;
          $scope.dialog.descricao = item.descricao;
          $scope.dialog.bloqueada = item.bloqueada;
          // todos esses for são para preencher os campos da tela de dialog 
          // quando abre uma atividade
          for(var i = 0; i < $scope.participantes.length; i++){
            if (item.idParticipante === $scope.participantes[i].idUsuario) {
              indexPart = i;
              i = $scope.participantes.length;
            };
          };
          $scope.dialog.participantes = {
            selected: $scope.participantes[indexPart],
            options: $scope.participantes
          };
          console.log($scope.dialog.participantes);
          for(i = 0; i < $scope.historias.length; i++){
            if (item.idHistoria === $scope.historias[i].idHistoria) {
              indexHist = i;
              i = $scope.historias.length;
            };
          };
          $scope.dialog.historias = { 
            selected: $scope.historias[indexHist],
            options: $scope.historias
          };
          for(var i = 0; i < $scope.estimativa.options.length; i++){
            if (item.duracao === $scope.estimativa.options[i]) {
              indexEsti = i;
              i = $scope.estimativa.length;
            };
          };
          $scope.dialog.estimativa.selected = $scope.estimativa.options[indexEsti];

          for(var i = 0; i < $scope.prioridade.options.length; i++){
            if (item.prioridade === $scope.prioridade.options[i]) {
              indexPrio = i;
              i = $scope.prioridade.length;
            };
          };
          $scope.dialog.prioridade.selected = $scope.prioridade.options[indexPrio];

          $scope.dialog.dataInicio = new Date(item.dataInicio.substring(6,10), item.dataInicio.substring(3,5),item.dataInicio.substring(0,2));
          $scope.dialog.dataFim = new Date(item.dataFim.substring(6,10), item.dataFim.substring(3,5),item.dataFim.substring(0,2));

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
  $scope.setStatus = function(idAtividade,status, listName, item, index){
    console.log(idAtividade);
    console.log(status);
    console.log(listName);
    console.log(item);
    console.log(index);
    // atividades.updateStatus(idAtividade, status).success(function(data) {
    // });
  };
  $scope.changeStatusScope = function(status){
    $scope.status = status;
    console.log($scope.status);
  };
  $scope.logEvent = function(event){
    console.log(event);

  };
});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('demo').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $confirm, items, atividades) {
  $scope.dialog = items;

  $scope.save = function (itemDialog) {
    items.selected.idHistoria = itemDialog.historias.selected.idHistoria;
    items.selected.idParticipante = itemDialog.participantes.selected.idUsuario;
    items.selected.duracao = itemDialog.estimativa.selected;
    items.selected.descricao = itemDialog.descricao;
    items.selected.bloqueada = itemDialog.bloqueada;
    items.selected.prioridade = itemDialog.prioridade.selected;
    atividades.update($scope.dialog.selected).success(function(data) {
    });
    // $uibModalInstance.close($scope.dialog.selected.item);
    $uibModalInstance.close(items.selected.item);
  };

  $scope.delete = function () {
    atividades.delete($scope.dialog.selected.idAtividade).success(function(data) {
      console.log("12312");
      atividades.get().success(function(data) {
        console.log("teste");
        console.log(data);
        items = data;
        $scope.$watch('models', function(model) {
          $scope.modelAsJson = angular.toJson($scope.dataAmazon, true);
            // $scope.modelAsJson = angular.toJson($scope.models, true);
          $scope.models = data;    
          }, true);
      });
    });
    // $uibModalInstance.close($scope.dialog.selected.item);
    $uibModalInstance.close(items.selected.item);
  };
  $scope.cancel = function () {
    $uibModalInstance.close(items.selected.item);
  };
});
