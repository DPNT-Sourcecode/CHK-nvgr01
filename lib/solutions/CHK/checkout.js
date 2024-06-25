'use strict';

//noinspection JSUnusedLocalSymbols
const { priceTable, discountTable, } = require('../../data/index');

const { getAllDiscountOrders, getMinMaxDiscount, calculateBestDiscount, initializeObjectFromArray } = require('../../functions/index');

/**
 * 
 * @param {*} skus 
 */
module.exports = function (skus) {
    // throw new Error("method not implemented");
    // Remove the white space from the skus string
    const skusWithoutWhiteSpace = skus.replace(/\s+/g, '');
    // Convert the skus string to an array
    const skusArray = skusWithoutWhiteSpace.split('');

    let total = 0;
    let mainCountOfEachSku = initializeObjectFromArray(skusArray, 0);

    let mainDiscountedAppliedForSku = initializeObjectFromArray(skusArray, false);

    // Loop through the skus array
    for (let i = 0; i < skusArray.length; i++) {
        // Check if the sku is not in the price table
        if (!priceTable.hasOwnProperty(skusArray[i])) {
            total = -1;
            return total;
        }
        // Add the price of the sku to the total
        total += priceTable[skusArray[i]];
        // Increment the count of the sku
        mainCountOfEachSku[skusArray[i]]++;
    }

    // Check for any discounts
    for (const sku in discountTable) {

        const discounts = discountTable[sku];
        // const [minDiscount,] = getMinMaxDiscount(discounts);
        const minDiscount = discounts[0];
        if (mainCountOfEachSku[sku] < minDiscount["quantity"]) {
            continue;
        }
        let totalAfterDiscount = calculateBestDiscount(total, mainCountOfEachSku, discounts, sku, mainDiscountedAppliedForSku);
        total = totalAfterDiscount;
    }


    return total;
};
