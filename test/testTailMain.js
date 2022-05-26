const assert = require('assert');

const { tailMain } = require('../src/tailLib.js');

const shouldReturn = function (mockFiles) {
  let index = 0;
  return (fileName, encoding) => {
    assert.strictEqual(mockFiles[index].name, fileName);
    assert.strictEqual(encoding, 'utf8');
    const mockContent = mockFiles[index].content;
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

describe('tailMain', () => {
  it('should display a line of given file', () => {
    const consoleReport = [];
    const mockedReadFileSync = shouldReturn([
      { name: './a.txt', content: 'hello\nworld' }]);

    const expectedOutput = ['world'];
    const mockedConsole = shouldPrint(consoleReport, expectedOutput);
    const mockedError = shouldPrint(consoleReport, []);

    const args = ['-n', '1', './a.txt'];
    const logger = { stdOut: mockedConsole, stdError: mockedError };

    assert.deepStrictEqual(tailMain(
      mockedReadFileSync, logger, args), 0);
  });

  it('should display a characters of given files', () => {
    const consoleReport = [];
    const mockedReadFileSync = shouldReturn([
      { name: './a.txt', content: 'hello\nworld' },
      { name: './b.txt', content: 'say\nbye' }]);

    const expectedOutput = [];
    expectedOutput.push('==> ./a.txt <==\nrld');
    expectedOutput.push('==> ./b.txt <==\nbye');

    const mockedConsole = shouldPrint(consoleReport, expectedOutput);
    const mockedError = shouldPrint(consoleReport, []);

    const args = ['-c', '3', './a.txt', './b.txt'];
    const logger = { stdOut: mockedConsole, stdError: mockedError };

    assert.deepStrictEqual(tailMain(
      mockedReadFileSync, logger, args), 0);
  });

  it('should display error for bad file', () => {
    const consoleReport = [];
    const mockedReadFileSync = shouldReturn([]);

    const expectedError = [];
    expectedError.push('./a.txt: No such file or directory');

    const mockedConsole = shouldPrint(consoleReport, []);
    const mockedError = shouldPrint(consoleReport, ['tail: ./a.txt: No such file or directory']);

    const args = ['-c', '3', './a.txt'];
    const logger = { stdOut: mockedConsole, stdError: mockedError };

    assert.deepStrictEqual(tailMain(
      mockedReadFileSync, logger, args), 1);
  });
});
