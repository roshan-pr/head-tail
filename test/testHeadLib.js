const assert = require('assert');

const { head, sliceFromStart } = require('../src/headLib.js');

describe('head', () => {
  it('should return a single line', () => {
    assert.strictEqual(head('hello', { delimiter: '\n', count: 1 }), 'hello');
    assert.strictEqual(head('world', { delimiter: '\n', count: 1 }), 'world');
  });

  it('should return multiple lines', () => {
    assert.strictEqual(head('hello\nworld', {
      delimiter: '\n',
      count: 2
    }), 'hello\nworld');
    assert.strictEqual(head('say\nbye', {
      delimiter: '\n',
      count: 2
    }), 'say\nbye');
  });

  it('should return default count of lines or provided, with no count', () => {
    assert.strictEqual(head('hello\nworld\nsay\nbye', {
      delimiter: '\n',
    }), 'hello\nworld\nsay');
    assert.strictEqual(head('hello\nworld', {
      delimiter: '\n',
    }), 'hello\nworld');
  });
});

describe('sliceFromStart', () => {
  it('should give lines of provided count', () =>
    assert.deepStrictEqual(sliceFromStart(['hello', 'world'], 1), ['hello']));
  assert.deepStrictEqual(
    sliceFromStart(['hello', 'world'], 2), ['hello', 'world']);

  it('should give lines, even count greater than number of lines', () =>
    assert.deepStrictEqual(
      sliceFromStart(['hello'], 2), ['hello']));
  assert.deepStrictEqual(
    sliceFromStart(['hello', 'world'], 3), ['hello', 'world']);
});
