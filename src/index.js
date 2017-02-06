(function(){
  //vendor javascript
  require("angular");
  require("angular-resource");
  require("jQuery");
  require("bootstrap");


  // our javascript
  require('./js/appDirectives.js');
  require('./js/appServices.js');
  require('./js/bootstrap.js');
  require('./js/extendArrayPrototype.js');
  require('./js/quizApp.js');

  //vendor styles
  require('../node_modules/bootstrap/dist/css/bootstrap.css');
  require('../node_modules/bootstrap/dist/css/bootstrap-theme.css');
  require('animate.css');

  //custom styles
  require('./sass/style.scss');
})();