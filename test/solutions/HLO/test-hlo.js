var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const hello = require('../../../lib/solutions/HLO/hello');

describe('Hello world Challenge: says hello to the world', function () {
	it('should return Hello World!', function () {
    const friendName = "John";
		assert.equal(hello(friendName), "Hello, World!");
	});
});

