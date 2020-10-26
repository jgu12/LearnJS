var assert = require('assert');

describe('Just a sample test suite', function () {
  before(() => {
    console.log('samle tests...');
  });

  it('Adding two numbers', function () {
    let a = 10;
    let b = 10;
    let c = a + b;
    assert.equal(c, 20);
  });

  it('Divide two numbers', function () {
    let a = 10;
    let b = 10;
    let c = a / b;
    assert.equal(c, 1);
  });

});