const { parseArgs } = require('../src/parseArgs.js');

const assert = require('assert');

describe('parseArgs', () => {
  it('should parse the command line arguments, only fileName', () =>
    assert.deepStrictEqual(parseArgs(['./a.txt']), {
      files: ['./a.txt'], option: { name: '-n', value: 10 }
    }));

  it('should parse `-n 1 fileName` to object', () =>
    assert.deepStrictEqual(parseArgs(
      ['-n', '1', './a.txt']), {
      files: ['./a.txt'], option: { name: '-n', value: 1 }
    }));

  it('should parse `-c 1 fileName` to object', () =>
    assert.deepStrictEqual(parseArgs(
      ['-c', '1', './a.txt']), {
      files: ['./a.txt'], option: { name: '-c', value: 1 }
    }));

  it('should parse multiple files, without options', () =>
    assert.deepStrictEqual(parseArgs(
      ['file1', 'file2']), {
      files: ['file1', 'file2'], option: { name: '-n', value: 10 }
    }));

  it('should parse multiple files, with options', () =>
    assert.deepStrictEqual(parseArgs(
      ['-n', '2', 'file1', 'file2']), {
      files: ['file1', 'file2'], option: { name: '-n', value: 2 }
    }));

  it('should parse last valid option files', () =>
    assert.deepStrictEqual(parseArgs(
      ['-n', '2', '-n', '3', 'file1']), {
      files: ['file1'], option: { name: '-n', value: 3 }
    }));
});
