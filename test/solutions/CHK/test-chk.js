var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

describe('Checkout Challenge: returns the total basket value', function () {
  it('should return the total value of the basket', function () {
    const skus = "ABCD";
    const result = checkout(skus);
    assert.equal(result, 115);
	});

  it('should return -1', function () {
    const skus = "ABCDE";
    const result = checkout(skus);
    assert.equal(result, 115);
	});
});

