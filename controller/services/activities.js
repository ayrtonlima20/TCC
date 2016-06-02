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
  atividades.create = function(dataCreate){
    return $http.post('http://127.0.0.1:8090/crateAtividades', dataCreate) 
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
  historias.updateStatus = function (historia) {
    return $http.post('http://127.0.0.1:8090/setStatusHistoria', historia) 
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
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
    
  return $http.get('http://127.0.0.1:8090/getSprintActive') 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
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
  return testeAceitacao;
}]);
