(function(){

	var app = angular.module('appDirectives', []);

	app.directive('landingpage', function() {
		return {
			restrict: 'E',
			templateUrl: './Directives/landingPage.html'
		};
	});

	app.directive('quiz', function(){
		return {
			restrict: 'E',
			templateUrl: './Directives/quiz.html'
		};
	});

	app.directive('submitquestion', function(){
		return {
			restrict: 'E',
			templateUrl: './Directives/submitQuestion.html'
		};
	});

	app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]);
})();