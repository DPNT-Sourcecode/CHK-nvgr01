const { priceTable, discountTable } = require('../data/index');

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

// Function that checks if there is a unique combination of 3 or more items in the bulk discount
const checkForBulkDiscount = (countOfBulkDiscountSkus) => {
  let result = false;

  let uniqueItems = [];
  for (let sku in countOfBulkDiscountSkus) {
    if (countOfBulkDiscountSkus[sku] > 0 && !uniqueItems.includes(sku)) {
      uniqueItems.push(sku);
    }
  }
  if (uniqueItems.length >= 3) {
    result = true;
  }
  return result;
};

// Calculates the final price after applying the discount
const calculatePriceAfterDiscount = (total, countOfEachSku, discount, SKU, numberOfDiscounts, discountedAppliedForSku) => {
  let newTotal = total;

  // Check for any bulk discount
  if (discount.hasOwnProperty("bulk")) {
    const bulkDiscount = discount["bulk"];
    if (!discountedAppliedForSku[SKU]) {
      // Initialize the count of each item in the bulk discount skus to the countOfeachSku
      let countOfBulkDiscountSkus = {}; // 
      let countOfBulkDiscountSkusApplied = {}; // This count keeps track of the unique items in checkout we are applying the bulk discount to
      let bulkDiscountsApplied = 0;
      for (let i = 0; i < bulkDiscount["skus"].length; i++) {
        countOfBulkDiscountSkus[bulkDiscount["skus"][i]] = countOfEachSku[bulkDiscount["skus"][i]];
        countOfBulkDiscountSkusApplied[bulkDiscount["skus"][i]] = 0;
      }

      // While countOfBulkDiscountSkus has 3 or more unique items apply the bulk discount
      while (checkForBulkDiscount(countOfBulkDiscountSkus)) {
        let counter = 0;
        for (let i = 0; i < bulkDiscount["skus"].length; i++) {
          if (counter === 3) {
            break;
          }
          const sku = bulkDiscount["skus"][i];
          if (countOfBulkDiscountSkus[sku] > 0) {
            countOfBulkDiscountSkus[sku] -= 1;
            countOfBulkDiscountSkusApplied[sku] += 1;
            counter += 1;
          }
        }
        bulkDiscountsApplied += 1;
      }

      // Use countOfBulkDiscountSkusApplied to calculate the discount
      let totalDiscount = bulkDiscount["discount"] * bulkDiscountsApplied;

      let valueOfSKUsToDeduct = 0;
      for (let sku in countOfBulkDiscountSkusApplied) {
        console.log("sku", sku, "countOfBulkDiscountSkusApplied", countOfBulkDiscountSkusApplied[sku]);
        valueOfSKUsToDeduct += priceTable[sku] * countOfBulkDiscountSkusApplied[sku];
        console.log("valueOfSKUsToDeduct", valueOfSKUsToDeduct);
      }

      console.log("valueOfSKUsToDeduct", valueOfSKUsToDeduct);

      newTotal -= valueOfSKUsToDeduct;
      newTotal += totalDiscount;

      // For each sku in bulkDiscount["skus"] update the discountAppliedForSku#
      for (let i = 0; i < bulkDiscount["skus"].length; i++) {
        discountedAppliedForSku[bulkDiscount["skus"][i]] = true;
      }
    }
  }

  // Check for any free item
  if (discount.hasOwnProperty("free")) {
    const freeItem = discount["free"];
    // If a discount has been applied for the free item sku then skip
    // Number of discounts needs to be greater than 0
    if (numberOfDiscounts > 0 && !discountedAppliedForSku[freeItem["sku"]]) {

      let numberOfFreeItems = numberOfDiscounts * freeItem["quantity"];
      if (SKU === freeItem["sku"]) {
        // If the free item is the same as the SKU then we calculate the number of free items by dividing the count of the SKU by the quantity of the discount + 1
        numberOfFreeItems = Math.floor(countOfEachSku[freeItem["sku"]] / (discount["quantity"] + 1));
      }
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
  const permutations = getPermutations(skuKeys);
  let allDiscountOrders = [];
  for (let i = 0; i < permutations.length; i++) {
    let discountOrder = {};
    for (let j = 0; j < permutations[i].length; j++) {
      discountOrder[permutations[i][j]] = discountTable[permutations[i][j]];
    }
    allDiscountOrders.push(discountOrder);
  }
  return allDiscountOrders;
};

const initializeObjectFromArray = (arr, defaultValue) => {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj[arr[i]] = defaultValue;
  }
  return obj;
};


module.exports = {
  divideAndRoundDown,
  getNumberOfDiscount,
  calculateBestDiscount,
  getMinMaxDiscount,
  calculatePriceAfterDiscount,
  getPermutations,
  getAllDiscountOrders,
  initializeObjectFromArray
};
