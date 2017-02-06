
var localStorageMock = /* ... some mock code ... */
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

require('angular');
require("angular-resource");
require('angular-mocks');
require('../src/js/appDirectives.js');
require('../src/js/appServices.js');
require('../src/js/extendArrayPrototype.js');
require('../src/js/quizApp.js');