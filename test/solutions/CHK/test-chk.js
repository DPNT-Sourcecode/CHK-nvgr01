var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

describe('Checkout Challenge: returns the total basket value', function () {
  it('should return the total value of the basket', function () {
    const skus = "ABCDE";
    const result = checkout(skus);
    assert.equal(result, 155);
	});

  it('should return -1', function () {
    const skus = "ABCDEF";
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
    assert.equal(result, 250);
	});

  it('should apply discounts for 4B', function () {
    const skus = "BBBB";
    const result = checkout(skus);
    assert.equal(result, 90);
	});

  it('should apply discounts for 6A and 4B', function () {
    const skus = "AAAAAABBBB";
    const result = checkout(skus);
    assert.equal(result, 340);
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

  it('should apply discount for 2E with B in checkout', function () {
    const skus = "BEE";
    const result = checkout(skus);
    assert.equal(result, 80);
	});

  it('should apply discount for 2E with 2B in checkout', function () {
    const skus = "BBEE";
    const result = checkout(skus);
    assert.equal(result, 110);
	});

  it('should apply discount for 4E with B in checkout', function () {
    const skus = "BEEEE";
    const result = checkout(skus);
    assert.equal(result, 160);
	});
});
