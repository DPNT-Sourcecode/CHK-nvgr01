'use strict';

/**
 *  Adds two numbers
 * @param {number} x  - first number between 0 and 100
 * @param {number} y  - second number between 0 and 100
 * @returns 
 */
module.exports = function (x, y) {
    // Check if x and y is not between 0 and 100
    if (x < 0 || x > 100 || y < 0 || y > 100) {
        throw new Error("x and y must be between 0 and 100");
    }
    return x + y;
};

