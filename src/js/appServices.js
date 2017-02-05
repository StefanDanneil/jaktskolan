(function(){
	var module = angular.module('appServices', ['ngResource']);

	module.factory('JsonService', function($resource) {
   return $resource('Questions/questions.json',{ }, {
     getData: {method:'GET', isArray: true}
   });
 });

  module.service('fileUpload', ['$http', function ($http) {
    this.uploadFileToUrl = function(file, question, uploadUrl){
      var fd = new FormData();
      fd.append('file', file);
      fd.append('question', question)
      $http.post(uploadUrl, fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      })
      .success(function(){

      })
      .error(function(){

      });
    }
  }]);

})();