const assert = require('assert');
const { tailParser } = require('../src/tailParser.js');

describe('tailParser', () => {
  it('Should parse option argument, `-option number`', () => {
    assert.deepStrictEqual(tailParser(['-n', '2']),
      { options: [{ flag: '-n', limit: 2 }], files: [] });

    assert.deepStrictEqual(tailParser(['-c', '3']),
      { options: [{ flag: '-c', limit: 3 }], files: [] });
  });

  it('Should parse option argument, `-option number`', () => {
    assert.deepStrictEqual(tailParser(['-n', '2', '-n', '3', 'file']),
      { options: [{ flag: '-n', limit: 2 }, { flag: '-n', limit: 3 }], files: ['file'] });
  });

  it('Should parse option doesn\'t need limit', () => {
    assert.deepStrictEqual(tailParser(['-n', '2', '-r', 'file']),
      { options: [{ flag: '-n', limit: 2 }, { flag: '-r' }], files: ['file'] });
  });
});
