(function(){
  //vendor javascript
  require("angular");
  require("angular-resource");
  require("jQuery");
  require("bootstrap");


  // our javascript
  require('./js/app/app.js');
  require('./js/app/questions/index.js');

  require('./js/app/common/directives/landing-page/landing-page.js');
  require('./js/app/common/directives/submit-question/submit-question.js');
  require('./js/app/common/directives/quiz/quiz.js');
  require('./js/app/appServices.js');
  require('./js/extendArrayPrototype.js');

  //vendor styles
  require('../node_modules/bootstrap/dist/css/bootstrap.css');
  require('../node_modules/bootstrap/dist/css/bootstrap-theme.css');
  require('animate.css');

  //custom styles
  require('./sass/style.scss');
})();