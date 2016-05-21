// angular.module('demo', ['ngAnimate', 'ui.bootstrap']);  
angular.module('demo').controller('ModalDemoCtrl', function ($scope, $uibModal, $log, participantes, historias, atividades) {
  $scope.dialog = {};
  $scope.status = null;
  $scope.selected = null;
  $scope.dialogHide = true;
  $scope.animationsEnabled = true;
  $scope.participantes = {};
  $scope.historia = {};
  var historiasAtiv = {};

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

  participantes.success(function(data) {
    $scope.participantes = data;
  });   

  historias.get().success(function(data) {
    historiasAtiv = data;
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
          // console.log($scope.dialog.participantes);
          for(i = 0; i < historiasAtiv.length; i++){
            if (item.idHistoria === historiasAtiv[i].idHistoria) {
              indexHist = i;
              i = historiasAtiv.length;
            };
          };
          $scope.dialog.historia = { 
            idHistoria: historiasAtiv[indexHist].idHistoria,
            nome: historiasAtiv[indexHist].nome
          };
          console.log($scope.dialog.historia);
          // $scope.dialog.historia = historiasAtiv[indexHist].nome;
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

          // $scope.dialog.dataInicio = new Date(item.dataInicio.substring(6,10), item.dataInicio.substring(3,5),item.dataInicio.substring(0,2));
          // $scope.dialog.dataFim = new Date(item.dataFim.substring(6,10), item.dataFim.substring(3,5),item.dataFim.substring(0,2));
          $scope.dialog.dataInicio =  item.dataInicio;
          $scope.dialog.dataFim = item.dataFim;
          $scope.dialog.horaInicio =  item.horaInicio;
          $scope.dialog.horaFim = item.horaFim;

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
  $scope.logEvent = function(event, listName){
    console.log(event);
    console.log(listName);

  };
  $scope.getColumn = function(item){
    setTimeout(function(){
      var newColum = $("[taskID='" + item.idAtividade + "']").parent().attr('name');
      atividades.updateStatus(item.idAtividade, newColum).success(function(data) {
      });
      }, 100);
    };
  });

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('demo').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $confirm, items, atividades) {
  $scope.dialog = items;

  $scope.save = function (itemDialog) {
    console.log("12312");
    items.selected.idHistoria = itemDialog.historia.idHistoria;
    items.selected.idParticipante = itemDialog.participantes.selected.idUsuario;
    items.selected.duracao = itemDialog.estimativa.selected;
    items.selected.descricao = itemDialog.descricao;
    items.selected.bloqueada = itemDialog.bloqueada;
    items.selected.prioridade = itemDialog.prioridade.selected;
    console.log("$scope.dialog.selected");
    console.log($scope.dialog.selected);
    atividades.update($scope.dialog.selected).success(function(data) {
    });
    // $uibModalInstance.close($scope.dialog.selected.item);
    $uibModalInstance.close(items.selected.item);
  };

  $scope.delete = function () {
    atividades.delete($scope.dialog.selected.idAtividade).success(function(data) {
    }).error(function(error){
      console.log("erro");
      
    });
    // $uibModalInstance.close($scope.dialog.selected.item);
    $uibModalInstance.close(items.selected.item);
  };
  $scope.cancel = function () {
    $uibModalInstance.close(items.selected.item);
  };
});
