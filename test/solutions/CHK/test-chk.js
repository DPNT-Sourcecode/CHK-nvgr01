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
    assert.equal(result, -1);
	});

  it('should apply discount for A', function () {
    const skus = "AAA";
    const result = checkout(skus);
    assert.equal(result, 130);
	});

  it('should apply discount for B', function () {
    const skus = "BB";
    const result = checkout(skus);
    assert.equal(result, 45);
	});

  it('should apply discount for A and B', function () {
    const skus = "AAABB";
    const result = checkout(skus);
    assert.equal(result, 175);
	});

  it('should apply discounts for 6A', function () {
    const skus = "AAAAAA";
    const result = checkout(skus);
    assert.equal(result, 260);
	});

  it('should apply discounts for 2B', function () {
    const skus = "BBBB";
    const result = checkout(skus);
    assert.equal(result, 90);
	});

  it('should apply discounts for 6A and B', function () {
    const skus = "AAAAAABBBB";
    const result = checkout(skus);
    assert.equal(result, 350);
	});

  it('should apply discount for 5A', function () {
    const skus = "AAAAA";
    const result = checkout(skus);
    assert.equal(result, 200);
	});

  it('should apply discount for 10A', function () {
    const skus = "AAAAAAAAAA";
    const result = checkout(skus);
    assert.equal(result, 400);
	});
});



