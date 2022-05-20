const assert = require('assert');
const fs = require('fs');

const { headMain } = require('../src/headLib.js');

describe('headMain', () => {
  it.only('should give one lines of given file', () => {
    assert.deepStrictEqual(headMain(fs.readFileSync, './a.txt', {
      delimiter: '\n', count: 1
    }), 'hello');
  });
});
