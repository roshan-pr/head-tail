const assert = require('assert');

const { headMain } = require('../src/headLib.js');

const shouldReturn = function (mockFiles, contents) {
  let index = 0;
  return (fileName, encoding) => {
    assert.strictEqual(mockFiles[index], fileName);
    assert.strictEqual(encoding, 'utf8');
    const mockContent = contents[index];
    index++;
    return mockContent;
  };
};

describe('headMain', () => {
  it('should give object of a line of given file', () => {
    const mockedReadFileSync = shouldReturn(['./a.txt'], ['hello\nworld']);
    const args = ['-n', '1', './a.txt'];
    assert.deepStrictEqual(
      headMain(mockedReadFileSync, args),
      [{ isError: false, value: 'hello' }]);
  });

  it('should give object of lines of given file, no options', () => {
    const mockedReadFileSync = shouldReturn(['./a.txt'], ['b\ny\ne']);
    const args = ['./a.txt'];
    assert.deepStrictEqual(
      headMain(mockedReadFileSync, args),
      [{ isError: false, value: 'b\ny\ne' }],
    );
  });

  it('should give object of lines less than default', () => {
    const mockedReadFileSync = shouldReturn(
      ['./a.txt'], ['h\ne\nl\nl\no\nw\no\nr\nl\nd\nb\ny\ne']);
    const args = ['./a.txt'];
    assert.deepStrictEqual(
      headMain(mockedReadFileSync, args),
      [{ isError: false, value: 'h\ne\nl\nl\no\nw\no\nr\nl\nd' }],
    );
  });

  it('should display first counted lines of given files', () => {
    const mockedReadFileSync = shouldReturn(
      ['./a.txt', './b.txt'], ['a file content', 'b file content']);
    const args = ['./a.txt', './b.txt'];
    const expected = [
      { isError: false, value: '==> ./a.txt <==\na file content' },
      { isError: false, value: '==> ./b.txt <==\nb file content' }];
    assert.deepStrictEqual(headMain(mockedReadFileSync, args), expected);
  });

});
