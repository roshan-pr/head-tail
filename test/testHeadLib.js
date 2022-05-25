const assert = require('assert');

const { head, firstNChars, firstNLines } = require('../src/headLib.js');

describe('head', () => {
  it('should return a single line', () => {
    assert.strictEqual(head('hello', { name: '-n', value: 1 }), 'hello');
    assert.strictEqual(head('world', { name: '-n', value: 1 }), 'world');
  });

  it('should return multiple lines', () => {
    assert.strictEqual(head('hello\nworld',
      { name: '-n', value: 2 }), 'hello\nworld');
    assert.strictEqual(head('say\nbye',
      { name: '-n', value: 2 }), 'say\nbye');
  });

  it('should return characters of bytes count', () => {
    assert.strictEqual(head('hello', { name: '-c', value: 2 }), 'he');
    assert.strictEqual(head('hello', { name: '-c', value: 4 }), 'hell');
  });

  it('should return characters, count greater than the content', () => {
    assert.strictEqual(head('bye', { name: '-c', value: 4 }), 'bye');
    assert.strictEqual(head('hello', { name: '-c', value: 6 }), 'hello');
  });
});

describe('firstNChars', () => {
  it('should give first N characters of given content', () => {
    assert.strictEqual(firstNChars('hello', 3), 'hel');
    assert.strictEqual(firstNChars('world', 2), 'wo');
  });

  it('should return given content, if count is greater', () => {
    assert.strictEqual(firstNChars('say', 4), 'say');
    assert.strictEqual(firstNChars('bye', 6), 'bye');
  });
});

describe('firstNLines', () => {
  it('should give a N lines', () => {
    assert.strictEqual(firstNLines('hello\nworld', 1), 'hello');
    assert.strictEqual(firstNLines('say\nbye\nto', 2), 'say\nbye');
  });

  it('should return given lines, if count is greater', () => {
    assert.strictEqual(firstNLines('hello', 3), 'hello');
    assert.strictEqual(firstNLines('bye', 2), 'bye');
  });
});
