describe('QuestionController', function() {

	beforeEach(module('quiz'));

	// Wait with this until we figure out how to get ngresource to actually get the right resource when run in karma
	// describe('#setCurrentQuestion', function () {
	// 	it('should chane the current question', inject(function($controller){
	// 		var scope = {};
	// 		var questionController = $controller('QuestionController', {
	// 			$scope: scope
	// 		});

	// 		var questionBefore = scope.currentQuestion;

	// 		scope.setCurrentQuestion();

	// 		assert.notEqual(questionBefore, scope.currentQuestion);
	// 	}));
	// });

	describe('#setCurrentQuestion', function () {
		it('should increase the currentQuestionIndex', inject(function($controller){
			var scope = {};
			var questionController = $controller('QuestionController', {
				$scope: scope
			});

			var questionIndexBefore = scope.currentQuestionIndex;

			scope.setCurrentQuestion();

			assert.equal(questionIndexBefore + 1, scope.currentQuestionIndex);
		}));
	});

	describe('#enableQuiz', function () {
		it('should properly set the rules for quiz visibility', inject(function($controller){
			var scope = {};
			var questionController = $controller('QuestionController', {
				$scope: scope
			});

			scope.enableQuiz();

			assert.equal(true, scope.isQuizEnabled);
			assert.equal(false, scope.isSubmitQuestionsEnabled);
			assert.equal(false, scope.isLandingPageActive);
			assert.equal(false, scope.lightningQuestionsEnabled);
		}));
	});

	describe('#enableLightningQuestions', function () {
		it('should properly set the rules for quiz visibility', inject(function($controller){
			var scope = {};
			var questionController = $controller('QuestionController', {
				$scope: scope
			});

			scope.enableLightningQuestions();

			assert.equal(true, scope.lightningQuestionsEnabled);
			assert.equal(false, scope.isSubmitQuestionsEnabled);
			assert.equal(false, scope.isQuizEnabled);
			assert.equal(false, scope.isLandingPageActive);
		}));
	});

	describe('#showLandingPage', function () {
		it('should properly set the rules for landing page visibility', inject(function($controller){
			var scope = {};
			var questionController = $controller('QuestionController', {
				$scope: scope
			});

			scope.showLandingPage();

			assert.equal(true, scope.isLandingPageActive);
			assert.equal(false, scope.isSubmitQuestionsEnabled);
			assert.equal(false, scope.isQuizEnabled);
			assert.equal(false, scope.lightningQuestionsEnabled);
		}));
	});

	describe('#enableSubmitQuestions', function () {
		it('should properly set the rules for submit questions form visibility', inject(function($controller){
			var scope = {};
			var questionController = $controller('QuestionController', {
				$scope: scope
			});

			scope.enableSubmitQuestions();

			assert.equal(true, scope.isSubmitQuestionsEnabled);
			assert.equal(false, scope.isLandingPageActive);
			assert.equal(false, scope.isQuizEnabled);
			assert.equal(false, scope.lightningQuestionsEnabled);
		}));
	});
});