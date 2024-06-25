var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const sum = require('../../../lib/solutions/SUM/sum');

describe('SUM challenge: adding two numbers', function() {
	it('should return 3, which is the sum of 1 and 2', function() {
	    assert.equal(sum(1, 2), 3);
	});

	it('should throw an error if less than zero', function() {
		assert.throwa(() => sum(-1, 2), Error, "x and y must be between 0 and 100");
});
});
