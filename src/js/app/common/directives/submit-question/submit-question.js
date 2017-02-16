(function(){
  'use strict';

  angular
  .module('fc.quiz')
  .directive('submitquestion', submitquestion);

  function submitquestion() {
    return {
      restrict: 'E',
      templateUrl: 'src/js/app/common/directives/submit-question/submitQuestion.html'
    };
  };

})();