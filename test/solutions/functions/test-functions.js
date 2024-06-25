var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const { getAllDiscountOrders, getMinMaxDiscount, calculateBestDiscount, initializeObjectFromArray, checkForBulkDiscount }  = require('../../../lib/functions/index');

describe('Test key functions', function () {
	it('should test the checkForBulkDiscount', function () {
    const obj = {
      "S": 0
    };
		assert.equal(checkForBulkDiscount(obj), true);
	});
});
