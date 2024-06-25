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
  "B": [
      {
          "quantity": 2,
          "discount": 45
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
      {
          "quantity": 5,
          "discount": 45
      },
      {
          "quantity": 10,
          "discount": 80
      }
  ],
  "K": [
      {
          "quantity": 2,
          "discount": 150
      }
  ],
  "N": [
      {
          "quantity": 3,
          "discount": 0,
          "free": {
              "quantity": 1,
              "sku": "M"
          },
      }
  ],
  "P": [
      {
          "quantity": 5,
          "discount": 200
      }
  ],
  "R": [
      {
          "quantity": 3,
          "discount": 0,
          "free": {
              "quantity": 1,
              "sku": "Q"
          },
      }
  ],
  "Q": [
      {
          "quantity": 3,
          "discount": 80
      }
  ],
  "U": [
      {
          "quantity": 3,
          "discount": 0,
          "free": {
              "quantity": 1,
              "sku": "U"
          },
      }
  ],
  "V": [
      {
          "quantity": 2,
          "discount": 90
      },
      {
          "quantity": 3,
          "discount": 130
      }
  ],
};


module.exports = {
  priceTable,
  discountTable,
};


