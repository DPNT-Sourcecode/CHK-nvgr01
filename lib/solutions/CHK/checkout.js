'use strict';

//noinspection JSUnusedLocalSymbols

const priceTable = {
    "A": 50,
    "B": 30,
    "C": 20,
    "D": 15,
    "E": 40
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
    ],
    "E": [
        {
            "quantity": 2,
            "discount": 0,
            "free": {
                "quantity": 1,
                "sku": "B"
            },
        }
    ]
};

const divideAndRoundDown = (num, divisor) => {
    return Math.floor(num / divisor);
};

// Calculates the number of discounts in the checkout for a sku
const getNumberOfDiscount = (countOfA, quantity) => {
    const numberOfDiscounts = divideAndRoundDown(countOfA, quantity);
    return numberOfDiscounts;
};

// Calculates the minimum and maximum discount based on the quantity
const getMinMaxDiscount = (discounts) => {
    let minDiscount = discounts[0];
    let maxDiscount = discounts[0];
    for (let i = 1; i < discounts.length; i++) {
        if (discounts[i]["quantity"] < minDiscount["quantity"]) {
            minDiscount = discounts[i];
        }
        if (discounts[i]["quantity"] > maxDiscount["quantity"]) {
            maxDiscount = discounts[i];
        }
    }
    return [minDiscount, maxDiscount];
};

// Calculates the final price after applying the discount
const calculatePriceAfterDiscount = (total, countOfEachSku, discount, SKU) => {
    let newTotal = total;
    const numberOfDiscounts = getNumberOfDiscount(countOfEachSku[SKU], discount["quantity"]);
    newTotal -= priceTable[SKU] * discount["quantity"] * numberOfDiscounts;
    newTotal += discount["discount"] * numberOfDiscounts;

    // Check for any free item
    if (discount.hasOwnProperty("free")) {
        const freeItem = discount["free"];
        if (numberOfDiscounts > 0) {
            
        }
    }

    return newTotal;
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
        "D": 0,
        "E": 0
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
    for (const sku in discountTable) {
        const discounts = discountTable[sku];
        const [minDiscount, ] = getMinMaxDiscount(discounts);
        if (countOfEachSku[sku] < minDiscount["quantity"]) {
            continue;
        }
        
        let totalAfterDiscount = total;
        for (let i = 0; i < discounts.length; i++) {
            const currentTotalDiscount = calculatePriceAfterDiscount(total, countOfEachSku, discounts[i], sku);
            if (currentTotalDiscount < totalAfterDiscount) {
                totalAfterDiscount = currentTotalDiscount;
            }
        }
        total = totalAfterDiscount;
    }

    return total;
};
