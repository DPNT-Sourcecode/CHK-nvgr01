'use strict';

//noinspection JSUnusedLocalSymbols

const priceTable = {
    "A": 50,
    "B": 30,
    "C": 20,
    "D": 15
};

const discountTable = {
    "A": [
        {
            "quantity": 3,
            "discount": 130
        },
        {
            "quantity": 5,
            "discount": 200
        }
    ],
    "B": [
        {
            "quantity": 2,
            "discount": 45
        }
    ]
};

const divideAndRoundDown = (num, divisor) => {
    return Math.floor(num / divisor);
};

const getNumberOfDiscount = (countOfA, quantity) => {
    const numberOfDiscounts = divideAndRoundDown(countOfA, quantity);
    return numberOfDiscounts;
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
    const skusArray = skusWithoutWhiteSpace.split('');

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

    // Check for any discounts
    for (const discount in discountTable) {
        const minDiscount = discountTable[discount][0];
        const maxDiscount = discountTable[discount][0];
        if (countOfEachSku[discount] < minDiscount["quantity"]) {
            continue;
        }
        const numberOfDiscounts = getNumberOfDiscount(countOfEachSku[discount], discountTable[discount]["quantity"]);
        total -= priceTable[discount] * discountTable[discount]["quantity"] * numberOfDiscounts;
        total += discountTable[discount]["discount"] * numberOfDiscounts;
    }

    return total;
};

