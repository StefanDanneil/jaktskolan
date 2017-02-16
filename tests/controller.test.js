beforeEach(function () {
  angular.mock.module('fc.quiz', function($provide) {

  });
});

test('testSetCurrentQuestion', inject(function($controller){
  var scope = {};
  var questionController = $controller("QuestionController", {
    $scope: scope
  });

  var questionIndexBefore = scope.currentQuestionIndex;
  scope.setCurrentQuestion();
  expect(scope.currentQuestionIndex).toBe(questionIndexBefore+1);
}));


test('Test EnableQuiz - it should properly set the rules for quiz visibility', inject(function($controller){
  var scope = {};
  var questionController = $controller('QuestionController', {
    $scope: scope
  });

  scope.enableQuiz();

  expect(scope.isQuizEnabled).toBe(true);
  expect(scope.isSubmitQuestionsEnabled).toBe(false);
  expect(scope.isLandingPageActive).toBe(false);
  expect(scope.lightningQuestionsEnabled).toBe(false);
}));

test('Test enableLightningQuestions - it should properly set the rules for quiz visibility', inject(function($controller){
  var scope = {};
  var questionController = $controller('QuestionController', {
    $scope: scope
  });

  scope.enableLightningQuestions();

  expect(scope.lightningQuestionsEnabled).toBe(true);
  expect(scope.isSubmitQuestionsEnabled).toBe(false);
  expect(scope.isQuizEnabled).toBe(false);
  expect(scope.isLandingPageActive).toBe(false);
}));

test('Test showLandingPage - it should properly set the rules for landing page visibility', inject(function($controller){
  var scope = {};
  var questionController = $controller('QuestionController', {
    $scope: scope
  });

  scope.showLandingPage();

  expect(scope.isLandingPageActive).toBe(true);
  expect(scope.isSubmitQuestionsEnabled).toBe(false);
  expect(scope.isQuizEnabled).toBe(false);
  expect(scope.lightningQuestionsEnabled).toBe(false);
}));


  test('Test enableSubmitQuestions - should properly set the rules for submit questions form visibility', inject(function($controller){
    var scope = {};
    var questionController = $controller('QuestionController', {
      $scope: scope
    });

    scope.enableSubmitQuestions();

    expect(scope.isSubmitQuestionsEnabled).toBe(true);
    expect(scope.isLandingPageActive).toBe(false);
    expect(scope.isQuizEnabled).toBe(false);
    expect(scope.lightningQuestionsEnabled).toBe(false);
  }));
