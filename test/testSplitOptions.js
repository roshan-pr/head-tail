const { splitOptions } = require('../src/ParseArgs.js');

const assert = require('assert');
describe('splitOptions', () => {
  it('should split combined option and value', () => {
    const args = ['-n2'];
    const exp = ['-n', '2'];
    assert.deepStrictEqual(splitOptions(args), exp);
  });

  it('should return option and value, if separated', () => {
    const args = ['-n', '2'];
    const exp = ['-n', '2'];
    assert.deepStrictEqual(splitOptions(args), exp);
  });

  it('should separate `-` and number, `-10`', () => {
    const args = ['-10'];
    const exp = ['-', '10'];
    assert.deepStrictEqual(splitOptions(args), exp);
  });

  it('should give argument, not an option', () => {
    const args = ['file'];
    const exp = ['file'];
    assert.deepStrictEqual(splitOptions(args), exp);
  });
});
