const assert = require('assert');
const { headMain } = require('../src/headLib.js');
const { mockConsole, mockReadFileSync } = require('./mockFunctions.js');

describe('headMain', () => {
  it('should display a line of given file', () => {
    const consoleReport = [];
    const mockedReadFileSync = mockReadFileSync([{
      name: './a.txt', content: 'hello\nworld'
    }]);

    const expectedOutput = ['hello'];
    const mockedConsole = mockConsole(consoleReport, expectedOutput);
    const mockedError = mockConsole(consoleReport, []);

    const args = ['-n', '1', './a.txt'];
    const logger = { stdOut: mockedConsole, stdError: mockedError };
    assert.deepStrictEqual(headMain(mockedReadFileSync, logger, args), 0);
    assert.deepStrictEqual(consoleReport, expectedOutput);
  });

  it('should display lines of given file, no options provided', () => {
    const consoleReport = [];
    const mockedReadFileSync = mockReadFileSync([{
      name: './a.txt', content: 'b\ny\ne'
    }]);

    const expectedOutput = ['b\ny\ne'];
    const mockedConsole = mockConsole(consoleReport, expectedOutput);
    const mockedError = mockConsole(consoleReport, []);

    const args = ['./a.txt'];
    const logger = { stdOut: mockedConsole, stdError: mockedError };

    assert.deepStrictEqual(headMain(mockedReadFileSync, logger, args), 0);
    assert.deepStrictEqual(consoleReport, expectedOutput);
  });

  it('should display lines of default count, `head ./a.txt`', () => {
    const consoleReport = [];
    const mockedReadFileSync = mockReadFileSync([{
      name: './a.txt', content: 'h\ne\nl\nl\no\nw\no\nr\nl\nd\nb\ny\ne'
    }]);

    const expectedOutput = ['h\ne\nl\nl\no\nw\no\nr\nl\nd'];
    const mockedConsole = mockConsole(consoleReport, expectedOutput);
    const mockedError = mockConsole(consoleReport, []);

    const args = ['./a.txt'];
    const logger = { stdOut: mockedConsole, stdError: mockedError };
    assert.deepStrictEqual(headMain(mockedReadFileSync,
      logger, args), 0);
    assert.deepStrictEqual(consoleReport, expectedOutput);
  });

  it('should display first counted lines of given files', () => {
    const consoleReport = [];

    const mockedReadFileSync = mockReadFileSync([
      { name: './a.txt', content: 'content of a' },
      { name: './b.txt', content: 'content of b' }
    ]);

    const expectedOutput = [];
    expectedOutput.push('==> ./a.txt <==\ncontent of a');
    expectedOutput.push('==> ./b.txt <==\ncontent of b');
    const mockedConsole = mockConsole(consoleReport, expectedOutput);

    const args = ['./a.txt', './b.txt'];
    const logger = { stdOut: mockedConsole };
    assert.deepStrictEqual(headMain(mockedReadFileSync, logger, args), 0);
    assert.deepStrictEqual(consoleReport, expectedOutput);
  });

  it('should display lines of given files and error on non existing', () => {
    const consoleReport = [];

    const mockedReadFileSync = mockReadFileSync([
      { name: './a.txt', content: 'content of a' }
    ]);

    const expectedOutput = [];
    expectedOutput.push('==> ./a.txt <==\ncontent of a');
    const expectedError = [];
    expectedError.push('head: ./b.txt: No such file or directory');
    const mockedConsole = mockConsole(consoleReport, expectedOutput);
    const mockedError = mockConsole(consoleReport, expectedError);

    const args = ['./a.txt', './b.txt'];
    const logger = { stdOut: mockedConsole, stdError: mockedError };

    assert.deepStrictEqual(headMain(mockedReadFileSync, logger, args), 1);
    assert.deepStrictEqual(consoleReport, [...expectedOutput, ...expectedError]);
  });

});
