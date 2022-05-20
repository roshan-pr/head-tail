const assert = require('assert');

const { head, headOfLines } = require('../src/headLib.js');

describe('head', () => {
  it('should return a single line', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('world'), 'world');
  });

  it('should return multiple lines', () => {
    assert.strictEqual(head('hello\nworld'), 'hello\nworld');
    assert.strictEqual(head('say\nbye'), 'say\nbye');
  });

  it('should return default count of lines or less, provided no count', () => {
    assert.strictEqual(head('hello\nworld\nsay\nbye'), 'hello\nworld\nsay');
    assert.strictEqual(head('hello\nworld'), 'hello\nworld');
  });
});

describe('headOfLines', () => {
  it('should give lines of provided count', () =>
    assert.deepStrictEqual(headOfLines(['hello', 'world'], 1), ['hello']));
  assert.deepStrictEqual(
    headOfLines(['hello', 'world'], 2), ['hello', 'world']);

  it('should give lines, count greater than length', () =>
    assert.deepStrictEqual(
      headOfLines(['hello'], 2), ['hello']));
  assert.deepStrictEqual(
    headOfLines(['hello', 'world'], 3), ['hello', 'world']);
});
