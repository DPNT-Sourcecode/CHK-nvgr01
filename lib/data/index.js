const priceTable = {
  "A": 50,
  "B": 30,
  "C": 20,
  "D": 15,
  "E": 40,
  "F": 10,
  "G": 20,
  "H": 10,
  "I": 35,
  "J": 60,
  "K": 80,
  "L": 90,
  "M": 15,
  "N": 40,
  "O": 10,
  "P": 50,
  "Q": 30,
  "R": 50,
  "S": 30,
  "T": 20,
  "U": 40,
  "V": 50,
  "W": 20,
  "X": 90,
  "Y": 10,
  "Z": 50
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
  ],
  "H": [
      
};

module.exports = {
  priceTable,
  discountTable
};


