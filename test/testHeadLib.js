const assert = require('assert');

const { head } = require('../src/headLib.js');

describe('headLib', () => {
  it('should return a line', () => {
    assert.deepStrictEqual(head('hello'), 'hello');
    assert.deepStrictEqual(head('world'), 'world');
  });
});
