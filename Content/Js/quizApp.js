(function () {
	var app = angular.module("quiz", ['appServices', 'appDirectives']);

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
			$scope.currentQuestion = $scope.questions[$scope.currentQuestionIndex];
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
			return Math.floor($scope.currentQuestionIndex / 70 * 100);
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

    	$scope.toggleCollapsed = function($event){
    		$('#toggleMenuButton').toggleClass('collapsed');
    	};
	}]);

	app.controller('NewQuestionController', ['$scope', '$http', function($scope, $http){
		$scope.isPreviewEnabled = false;

		$scope.newQuestion = {
			text: "",
			isImageQuestion: false,
			imageUrl: null,
			answers: [
				{
			    	text: "",
			    	isRightAnswer: true
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

    	$scope.togglePreview = function(){
    		$scope.isPreviewEnabled = !$scope.isPreviewEnabled;
    	};

    	$scope.submitQuestion = function(){
    		$scope.isPreviewEnabled = false;

    		try {
    			$scope.validateNewQuestion();

				var request = {
					method: 'POST',
					url: './API/test.php',
					headers: {
						'Content-Type': 'application/json',
						'Charset': 'UTF-8'
					},
					data: { question: JSON.stringify($scope.newQuestion) }
				}

				$http(request);

	    		$scope.newQuestion = {
					text: "",
					isImageQuestion: false,
					imageUrl: null,
					answers: [
						{
					    	text: "",
					    	isRightAnswer: true
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
		    	$scope.giveUserAlert('success', 'Tack för ditt bidrag!');
    		}
    		catch(error){
				var errorMessage = '<strong>Varning!</strong> '+ error
				$scope.giveUserAlert('danger', errorMessage);
    		}
    	};

    	$scope.giveUserAlert = function(alertType, message){
    		var alert = $('<div />')
				.addClass('alert alert-dismissible alert-' + alertType)
				.attr('role', 'alert')
				.html(message);

			alert.append('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>');

			$('#questionForm').find('.panel-footer').prepend(alert);
    	}

    	$scope.validateNewQuestion = function(){
    		var isQuestionValid = true;

    		if($scope.newQuestion.text.trim().length === 0){
    			isQuestionValid = false;
    			throw "Frågan får inte vara tom!";
    		} else {
    			for(var i = 0; i < $scope.newQuestion.answers.length; i++){
    				if($scope.newQuestion.answers[i].text.trim().length === 0){
    					isQuestionValid = false;
    					throw "Alternativ " + (i+1) + " får inte vara tomt!";
    				} else {
    					for(var j = 0; j < $scope.newQuestion.answers.length; j ++){
    						if(j !== i){
    							if($scope.newQuestion.answers[i].text.trim().toLowerCase() === $scope.newQuestion.answers[j].text.trim().toLowerCase() ){
    								isQuestionValid = false;
    								throw "Alternativ " + (j+1) + " är en kopia av alternativ " + (i+1);
    							}
    						}
    					}
    				}
    			}
    		}

    		return isQuestionValid;
    	};

	}]);

})();