(function(){
  'use strict';

  angular
    .module('fc.quiz')
    .controller('NewQuestionController', NewQuestionsController);

  NewQuestionsController.$inject = [
    '$scope',
    'fileUpload',
    '$http'
  ];

  function NewQuestionsController(
    $scope,
    fileUpload,
    $http) {

    var vm = this;
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
        vm.validateNewQuestion();

        $scope.postForm();

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
        vm.giveUserAlert('success', 'Tack för ditt bidrag!');
      }
      catch(error){
        var errorMessage = '<strong>Varning!</strong> '+ error
        vm.giveUserAlert('danger', errorMessage);
      }
    };

    $scope.postForm = function(){
      var file = $scope.myFile;
      var question = JSON.stringify($scope.newQuestion);
      var uploadUrl = "./API/submitQuestion.php";
      fileUpload.uploadFileToUrl(file, question, uploadUrl);
    };

    this.giveUserAlert = function(alertType, message){
      var alert = $('<div />')
      .addClass('alert alert-dismissible alert-' + alertType)
      .attr('role', 'alert')
      .html(message);

      var button = $('<button />')
      .attr('type', 'button')
      .addClass('close')
      .attr('data-dismiss', 'alert')
      .attr('aria-label', 'Close')

      var span = $('<span />')
      .attr('aria-hidden', 'true')
      .html('&times;');

      button.append(span);
      alert.append(button);

      $('#questionForm').find('.panel-footer').prepend(alert);
    };

    this.validateNewQuestion = function(){
      var isQuestionValid = true;

      if($scope.newQuestion.text.trim().length === 0){
        isQuestionValid = false;
        throw "Frågan får inte vara tom!";
      } else {
        for(var i = 0; i < $scope.newQuestion.answers.length; i++){
          var answerToValidate = $scope.newQuestion.answers[i].text.trim().toLowerCase();
          if(answerToValidate.length === 0){
            isQuestionValid = false;
            throw "Alternativ " + (i+1) + " får inte vara tomt!";
          } else {
            for(var j = 0; j < $scope.newQuestion.answers.length; j ++){
              var answerToValidateAgainst = $scope.newQuestion.answers[j].text.trim().toLowerCase();
              if(j !== i){
                if(answerToValidate === answerToValidateAgainst){
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

  };
})();