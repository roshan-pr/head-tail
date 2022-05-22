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

  it('should return characters of bytes count', () => {
    assert.strictEqual(head('hello', { delimiter: '', count: 2 }), 'he');
    assert.strictEqual(head('hello', { delimiter: '', count: 4 }), 'hell');
  });

  it('should return characters, count greater than the content', () => {
    assert.strictEqual(head('bye', { delimiter: '', count: 4 }), 'bye');
    assert.strictEqual(head('hello', { delimiter: '', count: 6 }), 'hello');
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
