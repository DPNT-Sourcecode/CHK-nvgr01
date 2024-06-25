'use strict';

//noinspection JSUnusedLocalSymbols

const priceTable = {
    "A": 50,
    "B": 30,
    "C": 20,
    "D": 15
};

const discountTable = {
    "A": {
        "quantity": 3,
        "discount": 20
    },
    "B": {
        "quantity": 2,
        "discount": 15
    }
};

const divideAndRoundDown = (num, divisor) => {
    return Math.floor(num / divisor);
};

const getNumberOfDiscount = (countOfA, quantity) => {
    const numberOfDiscounts = divideAndRoundDown(countOfA, quantity);
    return numberOfDiscounts;
};

// const getNumberOfDiscountForB = (countOfB) => {
//     const numberOfDiscounts = divideAndRoundDown(countOfB, 2);
//     return numberOfDiscounts;
// };

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

    // Check if the count of A is greater than or equal to a multiple of 3
    const numberOfDiscountsForA = getNumberOfDiscount(countOfEachSku["A"]);
    if (numberOfDiscountsForA >= 1) {
        // Apply the discount for A
        total -= priceTable["A"] * 3 * numberOfDiscountsForA;
        total += 130 * numberOfDiscountsForA;
    }

    // Check if the count of B is greater than or equal to a multiple of 2
    const numberOfDiscountsForB = getNumberOfDiscountForB(countOfEachSku["B"]);
    if (numberOfDiscountsForB >= 1) {
        // Apply the discount for B
        total -= priceTable["B"] * 2 * numberOfDiscountsForB;
        total += 45 * numberOfDiscountsForB;
    }

    return total;
};





