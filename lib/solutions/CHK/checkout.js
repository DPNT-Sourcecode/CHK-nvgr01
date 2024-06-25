'use strict';

//noinspection JSUnusedLocalSymbols
const {priceTable, discountTable,} = require('../../data/index');

const {getAllDiscountOrders, getMinMaxDiscount, calculateBestDiscount, initializeObjectFromArray} = require('../../functions/index');

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
            break;
        }
        // Add the price of the sku to the total
        total += priceTable[skusArray[i]];
        // Increment the count of the sku
        mainCountOfEachSku[skusArray[i]]++;
    }

    //We will apply the discounts in different orders and find which is the best
    // const allDiscountOrders = getAllDiscountOrders(discountTable);
    const allDiscountOrders = [discountTable];
    const originalTotal = total;

    for (let i = 0; i < allDiscountOrders.length; i++) {
        const currentDiscountTable = allDiscountOrders[i];
        let currentOrderTotal = originalTotal;
        let countOfEachSku = JSON.parse(JSON.stringify(mainCountOfEachSku));
        let discountedAppliedForSku = JSON.parse(JSON.stringify(mainDiscountedAppliedForSku));

        // Check for any discounts
        for (const sku in currentDiscountTable) {

            const discounts = currentDiscountTable[sku];
            const [minDiscount,] = getMinMaxDiscount(discounts);
            if (countOfEachSku[sku] < minDiscount["quantity"]) {
                continue;
            }
            let totalAfterDiscount = calculateBestDiscount(currentOrderTotal, countOfEachSku, discounts, sku, discountedAppliedForSku);
            currentOrderTotal = totalAfterDiscount;
        }

        if (currentOrderTotal < total) {
            total = currentOrderTotal;
        }
    }

    return total;
};