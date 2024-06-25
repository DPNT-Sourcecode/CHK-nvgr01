'use strict';

//noinspection JSUnusedLocalSymbols

const priceTable = {
    "A": 50,
    "B": 30,
    "C": 20,
    "D": 15
};

/**
 * 
 * @param {*} skus 
 */
module.exports = function (skus) {
    // throw new Error("method not implemented");
    // Remove the white space from the skus string
    const skusWithoutWhiteSpace = skus.replace(/\s+/g, '');
    // Convert the skus string to an array
    const skusArray = skusWithoutWhiteSpace.split(',');

    let total = 0;
    let countOfEachSku = {
        "A": 0,
        "B": 0,
        "C": 0,
        "D": 0
    };

    // Loop through the skus array
    for (let i = 0; i < skusArray.length; i++) {
        // Check if the sku is not in the price table
        if (!priceTable.hasOwnProperty(skusArray[i])) {
            total = -1;
            break;
        }
        // Add the price of the sku to the total
        total += priceTable[skusArray[i]];
        // Increment the count of the sku
        countOfEachSku[skusArray[i]]++;
    }

    // Check if the count of A is greater than or equal to 3
    if (countOfEachSku["A"] >= 3) {
        total = total - priceTable["A"] * 3;
        total = total + 130;
    }

    // Check if the count of B is greater than or equal to 2
    if (countOfEachSku["B"] >= 2) {
        total = total - priceTable["B"] * 2;
        total = total + 45;
    }

    return total;
};
