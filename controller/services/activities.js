angular.module("demo").factory('forecast', ['$http', function($http) { 
  // return $http.get('https://s3.amazonaws.com/codecademy-content/courses/ltp4/forecast-api/forecast.json') 
    
  return $http.get('http://127.0.0.1:8090/listUsers') 
  	.success(function(data) { 
      return data; 
    }) 
    .error(function(err) { 
      return err; 
    }); 
}]);
