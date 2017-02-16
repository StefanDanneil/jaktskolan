
var localStorageMock = /* ... some mock code ... */
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

require('angular');
require("angular-resource");
require('angular-mocks');
require('../src/js/app/appServices.js');
require('../src/js/extendArrayPrototype.js');
require('../src/js/app/app.js');
require('../src/js/app/questions/index.js');