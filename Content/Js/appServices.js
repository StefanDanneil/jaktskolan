(function(){
	var module = angular.module('appServices', ['ngResource']);

	module.factory('JsonService', function($resource) {
	  return $resource('Questions/questions.json',{ }, {
	    getData: {method:'GET', isArray: true}
	  });
	});
})();