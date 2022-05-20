const assert = require('assert');

const { head } = require('../src/headLib.js');

describe('head', () => {
  it('should return a single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('world'), 'world');
  });

  it('should return a multiple lines', () => {
    assert.strictEqual(head('hello\nworld'), 'hello\nworld');
    assert.strictEqual(head('say\nbye'), 'say\nbye');
  });
});
