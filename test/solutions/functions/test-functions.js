var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const { getAllDiscountOrders, getMinMaxDiscount, calculateBestDiscount, initializeObjectFromArray, checkForBulkDiscount }  = require('../../../lib/functions/index');

describe('Test key functions', function () {
	it('should test the checkForBulkDiscount', function () {
    let obj = {
      "S": 1,
      "T": 1,
      "Y": 1,
      "X": 1,
      "Z": 1
    };
		assert.equal(checkForBulkDiscount(obj), true);

    obj = {
      "S": 0,
      "T": 0,
      "Y": 0,
      "X": 1,
      "Z": 1
    };
    assert.equal(checkForBulkDiscount(obj), false);
	});

  it('should test initializeObjectFromArray', function () {
    const arr = ["A", "B", "C"];

    const obj = initializeObjectFromArray(arr, 0);
    assert.deepEqual(obj, {
      "A": 0,
      "B": 0,
      "C": 0
    });

    const obj2 = initializeObjectFromArray(arr, false);
    assert.deepEqual(obj2, {
      "A": false,
      "B": false,
      "C": false
    });
	});
});

