(function(){
  'use strict';

  angular
  .module('fc.quiz')
  .directive('quiz', quiz);

  function quiz() {
    return {
      restrict: 'E',
      templateUrl: 'src/js/app/common/directives/quiz/quiz.html'
    };
  };

})();