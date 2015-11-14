(function () {
	angular.module('jsonService', ['ngResource']).factory('JsonService', function($resource) {
	  return $resource('Questions/questions.json',{ }, {
	    getData: {method:'GET', isArray: true}
	  });
	});

	var app = angular.module("quiz", ['jsonService']);

	app.controller("QuestionController", ['$scope','JsonService', function($scope, JsonService){
	  	$scope.questions = [];
	  	JsonService.getData(function(data){
			for(var i = 0; i < data.length; i++){
				var question = data[i];

				question.rightAnswer = function(){
			        for(var i = 0; i < this.answers.length; i++){
			            if(this.answers[i].isRightAnswer){
			                return this.answers[i];
			            }
			        }
			    };

				question.answers.shuffle();

				$scope.questions.push(data[i]);
			}
			$scope.questions.shuffle();
		});
		$scope.currentQuestionIndex = 0;
		$scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
		$scope.numberOfCorrectAnswers = 0;
		$scope.failedQuestions = [];
		$scope.isQuizFinished = false;
		$scope.progressPercentage = 0;
		$scope.lightningQuestionsEnabled = false;
		$scope.isLandingPageActive = true;
		$scope.isClickEnabled = true;
		$scope.isSubmitQuestionsEnabled = false;

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
			$scope.shuffleQuestions();
			$scope.resetQuizVariables();
		};

		$scope.shuffleQuestions = function(){
			$scope.questions.shuffle();
			for(var i = 0; i < $scope.questions.length; i++){
				$scope.questions[i].answers.shuffle();
			};
		};

		$scope.resetQuizVariables = function(){
			$scope.currentQuestionIndex = 0;
			$scope.progressPercentage = 0;
			$scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
			$scope.numberOfCorrectAnswers = 0;
			$scope.failedQuestions = [];

			$scope.isQuizFinished = false;
			$scope.lightningQuestionsEnabled = false;
			$scope.isLandingPageActive = false;
			$scope.isSubmitQuestionsEnabled = false;
		};

		$scope.getProgressPercentage = function(){
			return Math.floor($scope.currentQuestionIndex / $scope.questions.length * 100);
		};

		$scope.showLandingPage = function(){
			$scope.restartQuiz();
			$scope.isLandingPageActive = true;
		}

		$scope.enableLightningQuestions = function(){
			$scope.restartQuiz();
			$scope.lightningQuestionsEnabled = true;
		};

		$scope.enableSubmitQuestions = function(){
    		$scope.restartQuiz();
    		$scope.isSubmitQuestionsEnabled = true;
    	};
	}]);

	app.controller('NewQuestionController', ['$scope', function($scope){
		$scope.newQuestion = {
			text: "",
			isImageQuestion: false,
			imageUrl: null,
			answers: [
				{
			    	text: "",
			    	isRightAnswer: false
				},
				{
				    text: "",
				    isRightAnswer: false
				},
				{
				    text: "",
				    isRightAnswer: false
				},
				{
				    text: "",
				    isRightAnswer: false
				}
			]
    	};

    	$scope.submitQuestion = function(){
    		console.log($scope.newQuestion);
    		$scope.newQuestion = {
				text: "",
				isImageQuestion: false,
				imageUrl: null,
				answers: [
					{
				    	text: "",
				    	isRightAnswer: false
					},
					{
					    text: "",
					    isRightAnswer: false
					},
					{
					    text: "",
					    isRightAnswer: false
					},
					{
					    text: "",
					    isRightAnswer: false
					}
				]
	    	};
    	}
	}])
})();

