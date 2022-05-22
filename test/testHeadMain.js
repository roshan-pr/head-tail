const assert = require('assert');

const { headMain } = require('../src/headLib.js');

const shouldReturn = function (mockFile, content) {
  return (fileName, encoding) => {
    assert.strictEqual(mockFile, fileName);
    assert.strictEqual(encoding, 'utf8');
    return content;
  };
};

describe('headMain', () => {
  it('should give one lines of given file', () => {
    const mockedReadFileSync = shouldReturn('./a.txt', 'hello\nworld');
    const args = ['-n', '1', './a.txt'];
    assert.strictEqual(
      headMain(mockedReadFileSync, args), 'hello');
  });

  it('should display lines of given file, max lines 10', () => {
    const mockedReadFileSync = shouldReturn(
      './a.txt', 'h\ne\nl\nl\no\nw\no\nr\nl\nd\nb\ny\ne');
    const args = ['./a.txt'];
    assert.strictEqual(
      headMain(mockedReadFileSync, args), 'h\ne\nl\nl\no\nw\no\nr\nl\nd');
  });

  it('should display lines less than default', () => {
    const mockedReadFileSync = shouldReturn(
      './a.txt', 'h\ne\nl\nl\no');
    const args = ['./a.txt'];
    assert.strictEqual(
      headMain(mockedReadFileSync, args), 'h\ne\nl\nl\no');
  });

});
