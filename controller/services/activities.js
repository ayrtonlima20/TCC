angular.module("demo").factory('atividades', ['$http', function($http) { 
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
  var atividades = {};
  atividades.get = function(){
    return $http.get('http://127.0.0.1:8090/listKanban') 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    });
  };
  atividades.getAtividadesNewSprint = function(){
    return $http.get('http://127.0.0.1:8090/getAtividadesNewSprint') 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    });
  };
  atividades.create = function(dataCreate){
    return $http.post('http://127.0.0.1:8090/createAtividades', dataCreate) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  atividades.update = function(dataUpd){
    return $http.post('http://127.0.0.1:8090/setAtividade', dataUpd) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  atividades.delete = function (idAtividade) {
    var atividade = {"idAtividade": idAtividade};
    return $http.post('http://127.0.0.1:8090/delAtividade', atividade) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  atividades.updateStatus = function (atividade) {
    // var atividade = {"idAtividade": idAtividade,
    //                  "status": status};
    return $http.post('http://127.0.0.1:8090/setStatusAtividade', atividade) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  atividades.setSprintAtividade = function (atividades, idSprint) {
    param = { idSprint: idSprint,
      atividades: atividades
    };
    return $http.post('http://127.0.0.1:8090/setSprintAtividade', param) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  atividades.getAtividadesSprintBacklog = function (idHistoria) {
    var atividade = {"idHistoria": idHistoria};
    return $http.post('http://127.0.0.1:8090/getAtividadesSprintBacklog', atividade) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  atividades.getAtividades = function (idHistoria) {
    var atividade = {"idHistoria": idHistoria};
    return $http.post('http://127.0.0.1:8090/getAtividades', atividade) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  atividades.getAtividade = function (idAtividade) {
    var atividade = {"idAtividade": idAtividade};
    return $http.post('http://127.0.0.1:8090/getAtividade', atividade) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  atividades.setImpedimento = function (idAtividade, impedimento,bloqueada) {
    var atividade = {
      "idAtividade": idAtividade,
      "impedimento": impedimento,
      "bloqueada": bloqueada
    };
    return $http.post('http://127.0.0.1:8090/setImpedimento', atividade) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };

  return atividades;
   
}]);
angular.module("demo").factory('participantes', ['$http', function($http) { 
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
    
  return $http.get('http://127.0.0.1:8090/listUsuarios') 
  	.success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
}]);
angular.module("demo").factory('assuntos', ['$http', function($http) { 
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
  return $http.get('http://127.0.0.1:8090/listAssuntos') 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
}]);
angular.module("demo").factory('historias', ['$http', function($http) { 
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
  var historias = {};

  historias.get = function(){
    return $http.get('http://127.0.0.1:8090/listHistorias') 
      .success(function(data) { 
        return data; 
      }) 
      .error(function(err) { 
        return err; 
      });
  }; 
  historias.getHistSprintBacklog = function(){
    return $http.get('http://127.0.0.1:8090/listHistSprintBacklog') 
      .success(function(data) { 
        return data; 
      }) 
      .error(function(err) { 
        return err; 
      });
  };   
  historias.updateStatus = function (historia) {
    return $http.post('http://127.0.0.1:8090/setStatusHistoria', historia) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  historias.updateRelease = function (historia) {
    return $http.post('http://127.0.0.1:8090/setReleaseHistoria', historia) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  historias.create = function (historia) {
    return $http.post('http://127.0.0.1:8090/createHistoria', historia) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  historias.editar = function (historia) {
    return $http.post('http://127.0.0.1:8090/editarHistoria', historia) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  return historias;
}]);
angular.module("demo").factory('sprint', ['$http', function($http) { 
  var sprints = {};
  sprints.getAtivo = function () {
    return $http.get('http://127.0.0.1:8090/getSprintActive') 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  sprints.finalizarSprint = function (done) {

    return $http.post('http://127.0.0.1:8090/finalizarSprint', done) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  sprints.criarSprint = function (sprint) {

    return $http.post('http://127.0.0.1:8090/criarSprint', sprint) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  return sprints;
}]);

angular.module("demo").factory('testeAceitacao', ['$http', function($http) { 
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
  var testeAceitacao = {};

  testeAceitacao.get = function (idHist) {
    var historia = {idHistoria: idHist}
    return $http.post('http://127.0.0.1:8090/getTesteAceitacao', historia) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  testeAceitacao.delete = function (idTesteAceitacao) {
    var teste = {idTeste: idTesteAceitacao}
    return $http.post('http://127.0.0.1:8090/deleteTesteAceitacao', teste) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  testeAceitacao.create = function (teste) {
    return $http.post('http://127.0.0.1:8090/createTesteAceitacao', teste) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  testeAceitacao.setStatus = function (idTeste, status) {
    var teste = {
      "idTeste":idTeste,
      "status":status
    };
    return $http.post('http://127.0.0.1:8090/setStatusTeste', teste) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  return testeAceitacao;
}]);
angular.module("demo").factory('sprintBurndown', ['$http', function($http) { 
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
  var sprintBurndown = {};
  sprintBurndown.get = function (teste) {
    return $http.post('http://127.0.0.1:8090/getSprintBurndown', teste) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  return sprintBurndown;
}]);
angular.module("demo").factory('apontamento', ['$http', function($http) { 
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
  var apontamentos = {};
  apontamentos.get = function (idApontamento) {
    var apontamento = {"idApontamento": idApontamento};
    return $http.post('http://127.0.0.1:8090/getApontamento', apontamento) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  apontamentos.getApontamentos = function (idHistoria, idAtividade) {
    var apontamento = {
      "idHistoria": idHistoria,
      "idAtividade": idAtividade
    };
    return $http.post('http://127.0.0.1:8090/getApontamentos', apontamento) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  apontamentos.create = function (idHistoria, idAtividade, txtApontamento) {
    var apontamento = {
      "idHistoria": idHistoria,
      "idAtividade": idAtividade,
      "txtApontamento": txtApontamento
    };
    return $http.post('http://127.0.0.1:8090/createApontamento', apontamento) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  apontamentos.set = function (idHistoria, idAtividade, txtApontamento) {
    var apontamento = {
      "idHistoria": idHistoria,
      "idAtividade": idAtividade,
      "txtApontamento": txtApontamento
    };
    return $http.post('http://127.0.0.1:8090/setApontamento', apontamento) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  apontamentos.delete = function (idApontamento) {
    var apontamento = {
      idApontamento: idApontamento
    };
    return $http.post('http://127.0.0.1:8090/deleteApontamento', apontamento) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  return apontamentos;
}]);

angular.module("demo").factory('licoesAprendidas', ['$http', function($http) { 
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
  var licoesAprendidas = {};
  licoesAprendidas.create = function (licaoAprendida) {
    return $http.post('http://127.0.0.1:8090/createLicaoAprendida', licaoAprendida) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  licoesAprendidas.delete = function (idLicao) {
    var licao = {idLicao:idLicao};
    return $http.post('http://127.0.0.1:8090/deleteLicaoAprendida', licao) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  licoesAprendidas.get = function () {
    var filters =  {};
    return $http.post('http://127.0.0.1:8090/getLicoesAprendidas', filters) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  return licoesAprendidas;
}]);

angular.module("demo").factory('releases', ['$http', function($http) { 
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
  var releases = {};
  releases.create = function (release) {
    return $http.post('http://127.0.0.1:8090/createRelease', release) 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
  };
  return releases;
}]);
