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
})();