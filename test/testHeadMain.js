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

const shouldPrint = function (content, expected) {
  let index = 0;
  return (actual) => {
    assert.strictEqual(actual, expected[index], 'In mock print');
    content.push(actual);
    index++;
  };
};

describe('headMain', () => {
  it('should display a line of given file', () => {
    const consoleReport = [];
    const mockedReadFileSync = shouldReturn(['./a.txt'], ['hello\nworld']);
    const mockedConsole = shouldPrint(consoleReport, ['hello']);
    const mockedError = shouldPrint(consoleReport, []);
    const args = ['-n', '1', './a.txt'];
    assert.deepStrictEqual(headMain(mockedReadFileSync, {
      log: mockedConsole, error: mockedError
    }, args), 0);
    assert.deepStrictEqual(consoleReport, ['hello']);
  });

  it('should display lines of given file, no options provided', () => {
    const consoleReport = [];
    const mockedReadFileSync = shouldReturn(['./a.txt'], ['b\ny\ne']);
    const mockedConsole = shouldPrint(consoleReport, ['b\ny\ne']);
    const mockedError = shouldPrint(consoleReport, []);
    const args = ['./a.txt'];
    assert.deepStrictEqual(headMain(mockedReadFileSync, {
      log: mockedConsole, error: mockedError
    }, args), 0);
    assert.deepStrictEqual(consoleReport, ['b\ny\ne']);
  });

  it('should display lines of default count, `head ./a.txt`', () => {
    const consoleReport = [];
    const mockedReadFileSync = shouldReturn(
      ['./a.txt'], ['h\ne\nl\nl\no\nw\no\nr\nl\nd\nb\ny\ne']);
    const mockedConsole = shouldPrint(consoleReport,
      ['h\ne\nl\nl\no\nw\no\nr\nl\nd']);
    const mockedError = shouldPrint(consoleReport, []);
    const args = ['./a.txt'];
    assert.deepStrictEqual(
      headMain(mockedReadFileSync, {
        log: mockedConsole, error: mockedError
      }, args), 0);
    assert.deepStrictEqual(consoleReport, ['h\ne\nl\nl\no\nw\no\nr\nl\nd']);
  });

  it('should display first counted lines of given files', () => {
    const consoleReport = [];

    const mockedReadFileSync = shouldReturn(['./a.txt', './b.txt'],
      ['content of a', 'content of b']);
    const mockedConsole = shouldPrint(consoleReport,
      ['==> ./a.txt <==\ncontent of a', '==> ./b.txt <==\ncontent of b']);
    const mockedError = shouldPrint(consoleReport, ['====']);
    const args = ['./a.txt', './b.txt'];

    assert.deepStrictEqual(headMain(mockedReadFileSync,
      { log: mockedConsole, error: mockedError }, args), 0);
    assert.deepStrictEqual(consoleReport,
      ['==> ./a.txt <==\ncontent of a', '==> ./b.txt <==\ncontent of b']);
  });

});
