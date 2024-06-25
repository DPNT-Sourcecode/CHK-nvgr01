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
const getNumberOfDiscount = (countOfSKU, quantity) => {
    const numberOfDiscounts = divideAndRoundDown(countOfSKU, quantity);
    return numberOfDiscounts;
};


const calculateBestDiscount = (total, countOfEachSku, discounts, sku, discountedAppliedForSku) => {
    // Iterate discounts in descending order of quantity
    let newTotal = total;
    let currentDiscountIndex = discounts.length - 1;
    let currentSKUCount = countOfEachSku[sku];

    // This will ensure that it checks for the largest discount first
    while (currentDiscountIndex >= 0) {
        let currentDiscount = discounts[currentDiscountIndex];
        if (currentSKUCount >= currentDiscount["quantity"]) {
            const numberOfDiscounts = getNumberOfDiscount(currentSKUCount, currentDiscount["quantity"]);
            newTotal = calculatePriceAfterDiscount(newTotal, countOfEachSku, currentDiscount, sku, numberOfDiscounts, discountedAppliedForSku);
            currentSKUCount -= currentDiscount["quantity"] * numberOfDiscounts;
        }
        currentDiscountIndex -= 1;
    }

    return newTotal;
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
const calculatePriceAfterDiscount = (total, countOfEachSku, discount, SKU, numberOfDiscounts, discountedAppliedForSku) => {
    let newTotal = total;
    // const numberOfDiscounts = getNumberOfDiscount(countOfEachSku[SKU], discount["quantity"]);

    // Check for any free item
    if (discount.hasOwnProperty("free")) {
        const freeItem = discount["free"];
        if (numberOfDiscounts > 0) {

            const numberOfFreeItems = numberOfDiscounts * freeItem["quantity"];
            const countOfFreeItemInCheckout = countOfEachSku[freeItem["sku"]];

            // This is the number of free items to deduct from the checkout
            let numberOfFreeItemsToDeduct = 0;
            if (countOfFreeItemInCheckout >= numberOfFreeItems) {
                numberOfFreeItemsToDeduct = numberOfFreeItems;
            } else {
                numberOfFreeItemsToDeduct = countOfFreeItemInCheckout;
            }

            // Deduct the free items from the checkout
            newTotal -= priceTable[freeItem["sku"]] * numberOfFreeItemsToDeduct;
            // Update countOfEachSku for the free item
            countOfEachSku[freeItem["sku"]] -= numberOfFreeItemsToDeduct;

            // update discountedAppliedForSku
            discountedAppliedForSku[freeItem["sku"]] = true;

        }
    }

    if (discount["discount"] > 0) {
        newTotal -= priceTable[SKU] * discount["quantity"] * numberOfDiscounts;
        newTotal += discount["discount"] * numberOfDiscounts;

        // update discountedAppliedForSku
        discountedAppliedForSku[SKU] = true;
    }

    return newTotal;
};

const getPermutations = (arr) => {
    if (arr.length === 0) {
        return [[]];
    }
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        let rest = getPermutations(arr.slice(0, i).concat(arr.slice(i + 1)));
        for (let j = 0; j < rest.length; j++) {
            result.push([arr[i]].concat(rest[j]));
        }
    }
    return result;
};

// Function to get all the orders of the discount Table
const getAllDiscountOrders = (discountTable) => {
    const skuKeys = Object.keys(discountTable);
    const permutations = {};

    for (let sku of skuKeys) {
        permutations[sku] = getPermutations(discountTable[sku]);
    }

    const result = [];
    const combinePermutations = (currentIndex, currentObject) => {
        if (currentIndex === skuKeys.length) {
            result.push(JSON.parse(JSON.stringify(currentObject)));
            return;
        }

        const sku = skuKeys[currentIndex];
        for (let perm of permutations[sku]) {
            currentObject[sku] = perm;
            combinePermutations(currentIndex + 1, currentObject);
        }
    }

    combinePermutations(0, {});
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

    let discountedAppliedForSku = {
        "A": false,
        "B": false,
        "C": false,
        "D": false,
        "E": false
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

    //We will apply the discounts in different orders and find which is the best
    const allDiscountOrders = getAllDiscountOrders(discountTable);

    for ()

    // Check for any discounts
    for (const sku in discountTable) {
        const discounts = discountTable[sku];
        const [minDiscount,] = getMinMaxDiscount(discounts);
        if (countOfEachSku[sku] < minDiscount["quantity"]) {
            continue;
        }
        let totalAfterDiscount = calculateBestDiscount(total, countOfEachSku, discounts, sku, discountedAppliedForSku);
        total = totalAfterDiscount;
    }

    return total;
};
