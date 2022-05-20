const assert = require('assert');

const { head } = require('../src/headLib.js');

describe('head', () => {
  it('should return a single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('world'), 'world');
  });

  it('should return multiple lines', () => {
    assert.strictEqual(head('hello\nworld'), 'hello\nworld');
    assert.strictEqual(head('say\nbye'), 'say\nbye');
  });

  it('should return default count of lines, provided no count', () => {
    assert.strictEqual(head('hello\nworld\nsay\nbye'), 'hello\nworld\nsay');
    assert.strictEqual(head('hello\nworld'), 'hello\nworld');
  });
});
