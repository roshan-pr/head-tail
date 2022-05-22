const { parseArgs } = require('../src/parseArgs.js');

const assert = require('assert');

describe.only('parseArgs', () => {
  it('should parse the command line arguments, only fileName', () =>
    assert.deepStrictEqual(parseArgs(['./a.txt']), {
      files: ['./a.txt'], option: { name: 'n', value: 10 }
    }));

  it('should parse `-n 1 fileName` to object', () =>
    assert.deepStrictEqual(parseArgs(
      ['-n', '1', './a.txt']), {
      files: ['./a.txt'], option: { name: 'n', value: 1 }
    }));

  it('should parse `-c 1 fileName` to object', () =>
    assert.deepStrictEqual(parseArgs(
      ['-c', '1', './a.txt']), {
      files: ['./a.txt'], option: { name: 'c', value: 1 }
    }));
});
