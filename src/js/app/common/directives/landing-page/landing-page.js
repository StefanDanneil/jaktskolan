(function(){
  'use strict';

  angular
  .module('fc.quiz')
  .directive('landingpage', landingpage);

  function landingpage() {
    return {
      restrict: 'E',
      templateUrl: 'src/js/app/common/directives/landing-page/landingPage.html'
    };
  };

})();