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
    const options = { delimiter: '\n', count: 1 };
    assert.deepStrictEqual(
      headMain(mockedReadFileSync, './a.txt', options), 'hello');
  });
});
