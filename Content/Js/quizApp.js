(function () {
	var app = angular.module("quiz", []);

	app.controller("QuestionController", ['$scope', function($scope){
		$scope.questions = questions.shuffle();
		$scope.currentQuestionIndex = 0;
		$scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
		$scope.numberOfCorrectAnswers = 0;
		$scope.failedQuestions = [];
		$scope.isQuizFinished = false;
		$scope.progressPercentage = 0;
		$scope.lightningQuestionsEnabled = false;
		$scope.showLandingPage = true;
		$scope.isClickEnabled = true;

		$scope.submitAnswer = function(answer, event){
			$scope.currentQuestionIndex++;

			if($scope.lightningQuestionsEnabled) {
				if(answer.isRightAnswer){
					var triggeredButton = $(event.target);
					triggeredButton.removeClass('btn-primary').addClass('btn-success');
					$scope.isClickEnabled = false;
					setTimeout(function(){
						if($scope.currentQuestionIndex === 20){
							$scope.questions.shuffle();
							$scope.currentQuestionIndex = 0;
						}
						$scope.isClickEnabled = true;
						$scope.setCurrentQuestion();
						$scope.$apply();
					}, 500);
				} else {
					var triggeredButton = $(event.target);
					var rightAnswer = $();
					triggeredButton.removeClass('btn-primary').addClass('animated shake btn-danger');
					$('.btn[data-isRightAnswer="true"]').removeClass('btn-primary').addClass('animated pulse btn-success');
					$scope.isClickEnabled = false;
					setTimeout(function(){
						if($scope.currentQuestionIndex === 20){
							$scope.questions.shuffle();
							$scope.currentQuestionIndex = 0;
						}

						$scope.isClickEnabled = true;
						$scope.setCurrentQuestion();
						$scope.$apply();
					}, 2000);
				}

			} else {
				if(answer.isRightAnswer){
					$scope.numberOfCorrectAnswers++;
				} else {
					$scope.currentQuestion.userAnswer = answer;
					$scope.failedQuestions.push($scope.currentQuestion);
				}

				$scope.progressPercentage = $scope.getProgressPercentage();

				if($scope.currentQuestionIndex === 70){
					$scope.isQuizFinished = true;
					$scope.currentQuestionIndex = 0;
				}

				$scope.setCurrentQuestion();
			}


		};

		$scope.setCurrentQuestion = function(){
			if($scope.lightningQuestionsEnabled){
				$scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
			} else {
				$scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
			}
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
			$scope.lightningQuestionsEnabled = false;
			$scope.showLandingPage = false;
		};

		$scope.getProgressPercentage = function(){
			return Math.floor($scope.currentQuestionIndex / $scope.questions.length * 100);
		};

		$scope.showToLandingPage = function(){
			$scope.showLandingPage = true;
		}

		$scope.enableLightningQuestions = function(){
			$scope.restartQuiz();
			$scope.lightningQuestionsEnabled = true;
		};
	}]);
})();

