(function () {
	var app = angular.module("quiz", []);

	app.controller("QuestionController", ['$scope', function($scope){
		$scope.questions = questions.shuffle();
		$scope.currentQuestionIndex = 0;
		$scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
		$scope.numberOfCorrectAnswers = 0;
		$scope.failedQuestions = [];
		$scope.isQuizFinished = false;
		$scope.progressPercentage =0;

		$scope.submitAnswer = function(answer){
			if(answer.isRightAnswer){
				$scope.numberOfCorrectAnswers++;
			} else {
				$scope.currentQuestion.userAnswer = answer;
				$scope.failedQuestions.push($scope.currentQuestion);
			}

			$scope.currentQuestionIndex++;

			if($scope.currentQuestionIndex === $scope.questions.length){
				$scope.isQuizFinished = true;
				$scope.currentQuestionIndex = 0;
			}

			$scope.setCurrentQuestion();
			$scope.progressPercentage = $scope.getProgressPercentage();

		};

		$scope.setCurrentQuestion = function(){
			$scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
			window.scrollTo(0, 0);
		};

		$scope.restartQuiz = function(){
			$scope.questions.shuffle();
			for(var i = 0; i < $scope.questions.length; i++){
				$scope.questions[i].answers.shuffle();
			};
			$scope.isQuizFinished = false;
			$scope.currentQuestionIndex = 0;
			$scope.progressPercentage = 0;
			$scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
			$scope.numberOfCorrectAnswers = 0;
			$scope.failedQuestions = [];
		};

		$scope.getProgressPercentage = function(){
			return Math.floor($scope.currentQuestionIndex / $scope.questions.length * 100);
		};
	}]);
})();

