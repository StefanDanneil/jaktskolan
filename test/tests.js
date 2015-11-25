var assert = require('assert');
var test = require("Content/Js/extendArrayPrototype.js");

describe('Array', function() {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
      assert.equal(-1, [1,2,3].indexOf(2));
    });
  });
});

describe('something slow', function() {
  this.slow(100);

  it('should take long enough for me to go make a sandwich', function(done) {
    	setTimeout(done, 10);
  });
});