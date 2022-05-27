const assert = require('assert');

const { head, firstNChars, firstNLines, printResult, headOfFile } = require('../src/headLib.js');
const { mockConsole, mockReadFileSync } = require('./mockFunctions.js');

describe('head', () => {
  it('should return a single line', () => {
    assert.strictEqual(head('hello', { name: '-n', value: 1 }), 'hello');
    assert.strictEqual(head('world', { name: '-n', value: 1 }), 'world');
  });

  it('should return multiple lines', () => {
    assert.strictEqual(head('hello\nworld',
      { name: '-n', value: 2 }), 'hello\nworld');
    assert.strictEqual(head('say\nbye',
      { name: '-n', value: 2 }), 'say\nbye');
  });

  it('should return characters of bytes count', () => {
    assert.strictEqual(head('hello', { name: '-c', value: 2 }), 'he');
    assert.strictEqual(head('hello', { name: '-c', value: 4 }), 'hell');
  });

  it('should return characters, count greater than the content', () => {
    assert.strictEqual(head('bye', { name: '-c', value: 4 }), 'bye');
    assert.strictEqual(head('hello', { name: '-c', value: 6 }), 'hello');
  });
});

describe('firstNChars', () => {
  it('should give first N characters of given content', () => {
    assert.strictEqual(firstNChars('hello', 3), 'hel');
    assert.strictEqual(firstNChars('world', 2), 'wo');
  });

  it('should return given content, if count is greater', () => {
    assert.strictEqual(firstNChars('say', 4), 'say');
    assert.strictEqual(firstNChars('bye', 6), 'bye');
  });
});

describe('firstNLines', () => {
  it('should give a N lines', () => {
    assert.strictEqual(firstNLines('hello\nworld', 1), 'hello');
    assert.strictEqual(firstNLines('say\nbye\nto', 2), 'say\nbye');
  });

  it('should return given lines, if count is greater', () => {
    assert.strictEqual(firstNLines('hello', 3), 'hello');
    assert.strictEqual(firstNLines('bye', 2), 'bye');
  });
});

describe('printResult', () => {
  it('Should display the report, without any error', () => {
    const consoleReport = [];
    const report = [{ file: './a.txt', content: 'content of a.txt' }];

    const expectedOutput = ['content of a.txt'];
    const mockedLog = mockConsole(consoleReport, expectedOutput);
    const mockedError = mockConsole(consoleReport, []);

    const logger = { stdError: mockedError, stdOut: mockedLog };
    assert.deepStrictEqual(printResult(report, logger), undefined);
    assert.deepStrictEqual(consoleReport, expectedOutput);
  });

  it('Should display the report, with an error', () => {
    const consoleReport = [];
    const report = [
      { file: './b.txt', error: './b.txt: No such file or directory' }
    ];

    const expectedOutput = [];
    const mockedLog = mockConsole(consoleReport, expectedOutput);
    const expectedError = ['./b.txt: No such file or directory'];
    const mockedError = mockConsole(consoleReport, expectedError);

    const logger = { stdError: mockedError, stdOut: mockedLog };
    assert.deepStrictEqual(printResult(report, logger), undefined);
    assert.deepStrictEqual(consoleReport, expectedError);
  });
});

describe('headOfFile', () => {
  it('Should give the head content of a file', () => {
    const readFile = mockReadFileSync([{
      name: './a.txt', content: 'content of ./a.txt'
    }]);
    const file = './a.txt';
    const option = { name: '-n', value: 2 };

    const expected = { file: './a.txt', content: 'content of ./a.txt' };
    assert.deepStrictEqual(headOfFile(file, option, readFile), expected);
  });

  it('Should give error, file not present', () => {
    const readFile = mockReadFileSync([{
      name: './a.txt', error: './a.txt: No such file or directory'
    }]);
    const file = './a.txt';
    const option = { name: '-n', value: 2 };

    const expected = {
      file: './a.txt', error: 'head: ./a.txt: No such file or directory'
    };
    assert.deepStrictEqual(headOfFile(file, option, readFile), expected);
  });
});
