angular.module('demo').controller('DialogLicoesAprendidas', function ($scope, $window,  $uibModal, $log, $uibModalInstance, participantes, licoesAprendidas, assuntos) {
    $scope.participantes = {
        selected: null,
        options: []
    };
    $scope.assuntos = {
        selected: null,
        options: []
    };

    $scope.dialog = {
        "idUsuario": null,
        "usuario": null,
        "assunto": null,
        "descricao": null,
        "idProjeto": '1',
        "projeto": 'Projeto 1',
        "dataLicao": new Date()
    };
    participantes.success(function(data) {
        $scope.participantes.options = data;
    }); 
    assuntos.success(function(data){
        $scope.assuntos.options = data;
    });

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.save = function (dialog, participante, assunto) {
        dialog.idUsuario = participante.idUsuario;
        dialog.usuario = participante.nome;
        dialog.idAssunto = assunto.idAssunto;
        dialog.assunto = assunto.nome;
        licoesAprendidas.create(dialog).success(function(data) {
            // alerts.push({
            //     type: 'success', msg: 'Nova lição aprendida adicionada'
            // });
            $uibModalInstance.close(dialog);
        });
    };

    $scope.cancelar = function () {
        $uibModalInstance.dismiss('cancel');
    };


//     // $scope.dialog = {};
//     $scope.item = {};
//     $scope.status = null;
//     $scope.selected = null;
//     $scope.dialogHide = true;
//     $scope.animationsEnabled = true;
//     $scope.historia = null;

//     $scope.animationsEnabled = true;

//     $scope.openDialogAtividade = function (size, line) {
//         var modalInstance = $uibModal.open({
//             animation: true,
//             templateUrl: 'view/dialogAtividade.html',
//             controller: 'ModalAtividadeCtrl',
//             size: size,
//             resolve: {
//                 items: function () {
//                     var indexPart = 0; 
//                     var indexHist = 0; 
//                     var indexEsti = 0;
//                     var indexPrio = 0;
//                     // $scope.dialog.selected = $scope.models.selected;
//                     $scope.item.historia = line;
//                     $scope.item.estimativa = $scope.estimativa;
//                     $scope.item.prioridade = $scope.prioridade;
//                     $scope.item.participantes = {
//                         selected: null,
//                         options: $scope.participantes
//                     };
//                     return $scope.item;
//                 },
//                 alerts: function(){
//                     return $scope.alerts;
//                 },
//                 activs: function(){
//                     return $scope.atividades;
//                 }
//             }
//         });

//         modalInstance.result.then(function (selectedItem) {
//             $scope.selected = selectedItem;
//         }, function () {
//             $log.info('Modal dismissed at: ' + new Date());
//         });
//     };

//     $scope.toggleAnimation = function () {
//         $scope.animationsEnabled = !$scope.animationsEnabled;
//     };
// });

// angular.module('demo').controller('ModalAtividadeCtrl', function ($scope, $uibModalInstance, items, atividades, alerts,activs, participantes) {
//     $scope.participantes = {};
//     $scope.estimativa = [
//     1,
//     2,
//     3,
//     4,
//     5,
//     6,
//     7,
//     8
//     ];
//     $scope.prioridade =[
//     "Alta",
//     "Média",
//     "Baixa"
//     ];  

//     $scope.dialog = items;
//     $scope.save = function (activs) {
//         var activCreate = [];
//         var activUpd = [];
//         for (var i = 0; i < activs.length; i++) {
//             activs[i].idHistoria = items.historia.idHistoria;
//             if (activs[i].idAtividade === null){
//                 activs[i].idUsuario = activs[i].participantes.selected === null ? 0 : activs[i].participantes.selected.idUsuario;
//                 activs[i].duracao = activs[i].estimativas.selected === null ? 0 : activs[i].estimativas.selected;
//                 activs[i].prioridade = activs[i].prioridades.selected === null ? "" : activs[i].prioridades.selected;
//                 activCreate.push(activs[i]);
//             }else{
//                 activs[i].idUsuario = activs[i].participantes.selected === null ? 0 : activs[i].participantes.selected.idUsuario;
//                 activs[i].duracao = activs[i].estimativas.selected === null ? 0 : activs[i].estimativas.selected;
//                 activs[i].prioridade = activs[i].prioridades.selected === null ? "" : activs[i].prioridades.selected;
//                 activUpd.push(activs[i]);
//             };
//         };
//         if (activCreate.length >= 1) {
//             atividades.create(activCreate).success(function(data) {
//                 alerts.push({
//                     type: 'success', msg: 'Atividades adicionadas ao Sprint'
//                 });
//             });
//         };
//         if(activUpd.length >= 1){
//             atividades.update(activUpd).success(function(data) {
//                 alerts.push({
//                     type: 'success', msg: 'Atividades Alteradas'
//                 });
//             }); 
//         };
//         $uibModalInstance.dismiss('cancel');
//     };

//     $scope.cancel = function () {
//         $uibModalInstance.dismiss('cancel');
//     };

//     $scope.atividades = [
//     // { 
//     //     // title:'Atividade 1', 
//     //     // content: {
//     //         idAtividade: null,
//     //         idSprint: 1,
//     //         idHistoria: null,
//     //         nome: "Atividade 1",
//     //         prioridades: {
//     //             selected: null,
//     //             options: $scope.prioridade
//     //         },
//     //         participantes: null,
//     //         estimativas:{
//     //             selected: null,
//     //             options: $scope.estimativa
//     //         },
//     //         descricao: null
//     //     // } 
//     // }
//     ];
//     participantes.success(function(data) {
//         $scope.participantes = data;
//     }); 

//     atividades.getAtividadesSprintBacklog(items.historia.idHistoria).success(function(data) {
//         for (var i = 0; i < data.length; i++) {
//             $scope.atividades.push({ 
//                 idAtividade: data[i].idAtividade,
//                 idSprint: data[i].idSprint,
//                 idHistoria: data[i].idHistoria,
//                 idParticipante: data[i].idParticipante,
//                 nome: data[i].nome,
//                 prioridades: {
//                     selected: data[i].prioridade,
//                     options: $scope.prioridade
//                 },
//                 participantes: {
//                     selected: null,
//                     options: $scope.participantes
//                 },
//                 estimativas:{
//                     selected: data[i].duracao,
//                     options: $scope.estimativa
//                 },
//                 descricao: data[i].descricao
//             });     
//         } 
//     });


//     $scope.addAtividade = function() {
//         $scope.atividades.push({ 
//             // title:'Atividade '+ ($scope.atividades.length + 1),
//             // content: {
//                 idAtividade: null,
//                 idSprint: 1,
//                 idHistoria: null,
//                 idParticipante: null,
//                 nome:'Atividade '+ ($scope.atividades.length + 1),
//                 participantes: null,
//                 prioridades: {
//                     selected: null,
//                     options: $scope.prioridade
//                 },
//                 participantes: {
//                     selected: null,
//                     options: $scope.participantes
//                 },
//                 estimativas:{
//                     selected: null,
//                     options: $scope.estimativa
//                 },
//                 descricao: null
//             // } 
//         }); 
//     };
});