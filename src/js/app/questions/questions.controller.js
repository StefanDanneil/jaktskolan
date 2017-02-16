(function(){
  'use strict';

  angular
    .module('fc.quiz')
    .controller('QuestionController', QuestionController);

  QuestionController.$inject = [
    '$scope',
    'JsonService'
  ];

  function QuestionController(
    $scope,
    JsonService) {

    $scope.questions = [];
    $scope.failedQuestions = [];
    $scope.currentQuestionIndex = 0;
    $scope.numberOfCorrectAnswers = 0;
    $scope.progressPercentage = 0;
    $scope.isQuizEnabled = false;
    $scope.isQuizFinished = false;
    $scope.isSubmitQuestionsEnabled = false;
    $scope.lightningQuestionsEnabled = false;
    $scope.isLandingPageActive = true;
    $scope.isClickEnabled = true;

    activate();

    function activate() {
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
        $scope.setCurrentQuestion();
      });
    }

    $scope.submitAnswer = function(answer, event){
      if($scope.lightningQuestionsEnabled) {
        var triggeredButton = $(event.target);
        $scope.handleLightningQuestionAnswer(answer, triggeredButton);
      } else {
        $scope.handleRegularQuizAnswer(answer);
      }
    };

    $scope.handleLightningQuestionAnswer = function(answer, triggeredButton){
      if(answer.isRightAnswer){
        triggeredButton.removeClass('btn-primary')
        .addClass('btn-success');
        $scope.setLightningQuestionResultTimer(true);
      } else {
        triggeredButton.removeClass('btn-primary')
        .addClass('animated shake btn-danger');
        $('.btn[data-isRightAnswer="true"]')
        .removeClass('btn-primary')
        .addClass('animated pulse btn-success');
        $scope.setLightningQuestionResultTimer(false);
      }
    };

    $scope.handleRegularQuizAnswer = function(answer){
      if(answer.isRightAnswer){
        $scope.numberOfCorrectAnswers++;
      } else {
        $scope.currentQuestion.userAnswer = answer;
        $scope.failedQuestions.push($scope.currentQuestion);
      }

      $scope.setProgressPercentage();

      if($scope.currentQuestionIndex === 70){
        $scope.isQuizFinished = true;
        $scope.currentQuestionIndex = 0;
      }

      $scope.setCurrentQuestion();
    };

    $scope.setLightningQuestionResultTimer = function(isRightAnswer){
      var timeoutTimer = (isRightAnswer) ? 500 : 2000;
      $scope.isClickEnabled = false;

      setTimeout(function(){
        if($scope.currentQuestionIndex === 20){
          $scope.questions.shuffle();
          $scope.currentQuestionIndex = 0;
        }
        $scope.isClickEnabled = true;
        $scope.setCurrentQuestion();
        $scope.$apply();
      }, timeoutTimer);
    };

    $scope.setCurrentQuestion = function(){
      $scope.currentQuestionIndex++;
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
      $scope.numberOfCorrectAnswers = 0;
      $scope.failedQuestions = [];
      $scope.setCurrentQuestion();

      $scope.isQuizFinished = false;
      $scope.lightningQuestionsEnabled = false;
      $scope.isLandingPageActive = false;
      $scope.isSubmitQuestionsEnabled = false;
      $scope.isQuizEnabled = false;
    };

    $scope.setProgressPercentage = function(){
      $scope.progressPercentage = Math.floor($scope.currentQuestionIndex / 70 * 100);
    };

    $scope.showLandingPage = function(){
      $scope.restartQuiz();
      $scope.isLandingPageActive = true;
    }

    $scope.enableLightningQuestions = function(){
      $scope.restartQuiz();
      $scope.lightningQuestionsEnabled = true;
    };

    $scope.enableQuiz = function(){
      $scope.restartQuiz();
      $scope.isQuizEnabled = true;
    };

    $scope.enableSubmitQuestions = function(){
      $scope.restartQuiz();
      $scope.isSubmitQuestionsEnabled = true;
    };

    $scope.toggleCollapsed = function($event){
      $('#toggleMenuButton').toggleClass('collapsed');
    };
  };
})();