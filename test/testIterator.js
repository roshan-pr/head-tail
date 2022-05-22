const assert = require('assert');
const { iterator } = require('../src/iterator.js');

describe('iterator', () => {
  it('should give next value', () => {
    const argsIterator = iterator([1, 2, 3]);
    assert.deepStrictEqual(argsIterator.nextArg(), 2);
  });

  it('should evaluate has more value or not', () => {
    const argsIterator = iterator([1, 2]);
    assert.deepStrictEqual(argsIterator.hasMoreArg(), true);
  });

  it('should give current value', () => {
    const argsIterator = iterator([1, 2]);
    assert.deepStrictEqual(argsIterator.currentArg(), 1);
  });

  it('should give undefined, no next argument present', () => {
    const argsIterator = iterator([1]);
    assert.deepStrictEqual(argsIterator.nextArg(), undefined);
  });
});
