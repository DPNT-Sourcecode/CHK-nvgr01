var mocha = require('mocha')
var describe = mocha.describe
var it = mocha.it
var assert = require('assert');
const checkout = require('../../../lib/solutions/CHK/checkout');

describe('Checkout Challenge: returns the total basket value', function () {
  it('should return the total value of the basket', function () {
    const skus = "ABCDEFGHIJKLMNOPQRUVW";
    const result = checkout(skus);
    assert.equal(result, 755);
	});

  it('should return -1', function () {
    const skus = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1";
    const result = checkout(skus);
    assert.equal(result, -1);
	});

  it('should apply discount for A', function () {
    const skus = "AAA";
    const result = checkout(skus);
    assert.equal(result, 130);
	});

  it('should apply discount for B', function () {
    const skus = "BB";
    const result = checkout(skus);
    assert.equal(result, 45);
	});

  it('should apply discount for A and B', function () {
    const skus = "AAABB";
    const result = checkout(skus);
    assert.equal(result, 175);
	});

  it('should apply discounts for 6A', function () {
    const skus = "AAAAAA";
    const result = checkout(skus);
    assert.equal(result, 250);
	});

  it('should apply discounts for 4B', function () {
    const skus = "BBBB";
    const result = checkout(skus);
    assert.equal(result, 90);
	});

  it('should apply discounts for 6A and 4B', function () {
    const skus = "AAAAAABBBB";
    const result = checkout(skus);
    assert.equal(result, 340);
	});

  it('should apply discount for 5A', function () {
    const skus = "AAAAA";
    const result = checkout(skus);
    assert.equal(result, 200);
	});

  it('should apply discount for 8A', function () {
    const skus = "AAAAAAAA";
    const result = checkout(skus);
    assert.equal(result, 330);
	});

  it('should apply discount for 9A', function () {
    const skus = "AAAAAAAAA";
    const result = checkout(skus);
    assert.equal(result, 380);
	});

  it('should apply discount for 10A', function () {
    const skus = "AAAAAAAAAA";
    const result = checkout(skus);
    assert.equal(result, 400);
	});

  it('should apply discount for 2E with B in checkout', function () {
    const skus = "BEE";
    const result = checkout(skus);
    assert.equal(result, 80);
	});

  it('should apply discount for 2E with 2B in checkout', function () {
    const skus = "BBEE";
    const result = checkout(skus);
    assert.equal(result, 110);

    const skus2 = "BEBE";
    const result2 = checkout(skus2);
    assert.equal(result2, 110);
	});

  it('should apply discount for 4E with B in checkout', function () {
    const skus = "EEEEB";
    const result = checkout(skus);
    assert.equal(result, 160);
	});

  it('should apply discount for 4E with 2B in checkout', function () {
    const skus = "EEEEBB";
    const result = checkout(skus);
    assert.equal(result, 160);
	});

  it('should apply discount for 2E with 3B in checkout', function () {
    const skus = "EEBBB";
    const result = checkout(skus);
    assert.equal(result, 125);
	});

  it('should apply discounts for F', function () {
    const skus = "F";
    const result = checkout(skus);
    assert.equal(result, 10);
	});

  it('should apply discounts for 2F', function () {
    const skus = "FF";
    const result = checkout(skus);
    assert.equal(result, 20);
	});

  it('should apply discounts for 3F', function () {
    const skus = "FFF";
    const result = checkout(skus);
    assert.equal(result, 20);
	});
  
  it('should apply discounts for 4F', function () {
    const skus = "FFFF";
    const result = checkout(skus);
    assert.equal(result, 30);
	});

  it('should apply discounts for 5F', function () {
    const skus = "FFFFF";
    const result = checkout(skus);
    assert.equal(result, 40);
	});

  it('should apply discounts for 6F', function () {
    const skus = "FFFFFF";
    const result = checkout(skus);
    assert.equal(result, 40);
	});

  it('should apply discounts for 7F', function () {
    const skus = "FFFFFFF";
    const result = checkout(skus);
    assert.equal(result, 50);
	});

  it('should apply discounts for 8F', function () {
    const skus = "FFFFFFFF";
    const result = checkout(skus);
    assert.equal(result, 60);
	});

  it('should apply discounts for 2K', function () {
    const skus = "KK";
    const result = checkout(skus);
    assert.equal(result, 120);
  });

  it('should apply discounts for 5P', function () {
    const skus = "PPPPP";
    const result = checkout(skus);
    assert.equal(result, 200);
  });

  it('should apply discounts for 3Q', function () {
    const skus = "QQQ";
    const result = checkout(skus);
    assert.equal(result, 80);
  });

  it('should apply discounts for 2V', function () {
    const skus = "VV";
    const result = checkout(skus);
    assert.equal(result, 90);
  });

  it('should apply discounts for 3V', function () {
    const skus = "VVV";
    const result = checkout(skus);
    assert.equal(result, 130);
  });

  it('should apply discounts for 5V', function () {
    const skus = "VVVVV";
    const result = checkout(skus);
    assert.equal(result, 220);
  });

  it('should apply discounts for 3N 1M', function () {
    const skus = "NNNM";
    const result = checkout(skus);
    assert.equal(result, 120);
  });

  it('should apply discounts for 3R 1Q', function () {
    const skus = "RRRQ";
    const result = checkout(skus);
    assert.equal(result, 150);
  });

  it('should apply discounts for 3R', function () {
    const skus = "RRR";
    const result = checkout(skus);
    assert.equal(result, 150);
  });

  it('should apply discounts for 3R 4Q', function () {
    const skus = "RRRQQQQ";
    const result = checkout(skus);
    assert.equal(result, 230);
  });

  it('should apply discounts for 3U', function () {
    const skus = "UUU";
    const result = checkout(skus);
    assert.equal(result, 120);
  });

  it('should apply discounts for 4U', function () {
    const skus = "UUUU";
    const result = checkout(skus);
    assert.equal(result, 120);
  });

  it('should apply discounts for 1S 1T 1X', function () {
    const skus = "STX";
    const result = checkout(skus);
    assert.equal(result, 45);
  });

  it('should apply discounts for 1S 1T 1X 1Y 1Z', function () {
    const skus = "STXYZ";
    const result = checkout(skus);
    assert.equal(result, 82);
  });

  it('should apply discounts for 3H', function () {
    const skus = "HHH";
    const result = checkout(skus);
    assert.equal(result, 30);
  });

  it('should apply discounts for 4H', function () {
    const skus = "HHHH";
    const result = checkout(skus);
    assert.equal(result, 40);
  });

  it('should apply discounts for 5H', function () {
    const skus = "HHHHH";
    const result = checkout(skus);
    assert.equal(result, 45);
  });

  it('should apply discounts for 3S', function () {
    const skus = "SSS";
    const result = checkout(skus);
    assert.equal(result, 45);
  });

  it('should apply discounts for 3Z', function () {
    const skus = "ZZZ";
    const result = checkout(skus);
    assert.equal(result, 45);
  });

  it('should apply discounts for 3S 1Z', function () {
    const skus = "SSSZ";
    const result = checkout(skus);
    assert.equal(result, 65);
  });

  it('should apply discounts for 2S 2T 2X 2Y 2Z', function () {
    const skus = "STXYZSTXYZ";
    const result = checkout(skus);
    assert.equal(result, 152);
  });

  it('should apply discounts for ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ', function () {
    const skus = "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const result = checkout(skus);
    assert.equal(result, 1602);
  });

  it('should apply discounts for LGCKAQXFOSKZGIWHNRNDITVBUUEOZXPYAVFDEPTBMQLYJRSMJCWH', function () {
    const skus = "LGCKAQXFOSKZGIWHNRNDITVBUUEOZXPYAVFDEPTBMQLYJRSMJCWH";
    const result = checkout(skus);
    assert.equal(result, 1602);
  });

  it('should apply discounts for AAAAAPPPPPUUUUEEBRRRQAAAHHHHHHHHHHKKVVVBBNNNMFFFQQQVVHHHHHSTX', function () {
    const skus = "AAAAAPPPPPUUUUEEBRRRQAAAHHHHHHHHHHKKVVVBBNNNMFFFQQQVVHHHHHSTX";
    const result = checkout(skus);
    assert.equal(result, 1655);
  });
});
