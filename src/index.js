(function(){
  //vendor javascript
  require("angular");
  require("angular-resource");
  require("jQuery");
  require("bootstrap");


  // our javascript
  require('./js/quizApp.js');
  require('./js/quiz/index.js');

  require('./js/appDirectives.js');
  require('./js/appServices.js');
  require('./js/extendArrayPrototype.js');

  //vendor styles
  require('../node_modules/bootstrap/dist/css/bootstrap.css');
  require('../node_modules/bootstrap/dist/css/bootstrap-theme.css');
  require('animate.css');

  //custom styles
  require('./sass/style.scss');
})();