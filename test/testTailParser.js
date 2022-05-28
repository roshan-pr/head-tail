const assert = require('assert');
const { tailParser } = require('../src/tailParser.js');

describe.only('tailParser', () => {
  it('Should parse option argument, `-option number`', () => {
    assert.deepStrictEqual(tailParser(['-n', '2']),
      { option: { name: '-n', limit: 2 } });

    assert.deepStrictEqual(tailParser(['-c', 3]),
      { option: { name: '-c', limit: 3 } });
  });
});
