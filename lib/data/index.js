const priceTable = {
  "A": 50,
  "B": 30,
  "C": 20,
  "D": 15,
  "E": 40,
  "F": 10,
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
  ],
  "F": [
      {
          "quantity": 2,
          "discount": 0,
          "free": {
              "quantity": 1,
              "sku": "F"
          },
      }
  ]
};

module.exports = {
  priceTable,
  discountTable
};

