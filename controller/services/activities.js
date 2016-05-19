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
  atividades.updateStatus = function (idAtividade, status) {
    var atividade = {"idAtividade": idAtividade,
                     "status": status};
    return $http.post('http://127.0.0.1:8090/setStatusAtividade', atividade) 
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
    
  return $http.get('http://127.0.0.1:8090/listHistorias') 
    .success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
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
