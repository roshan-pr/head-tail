const { tail } = require('../src/tailLib.js');

const { lastNChars, lastNLines } = require('../src/tailLib.js');

const assert = require('assert');

describe('tail', () => {
  it('should return given content', () => {
    assert.strictEqual(tail('hello', { name: '-n', value: 10 }), 'hello');
    assert.strictEqual(tail('world', { name: '-n', value: 10 }), 'world');
  });

  it('should return default count lines, if more lines provided', () => {
    assert.strictEqual(tail('h\ne\nl\nl\no\nw\no\nr\nl\nd\nb\ny\ne',
      { name: '-n', value: 10 }), 'l\no\nw\no\nr\nl\nd\nb\ny\ne');
  });
});

describe('lastNChars', () => {
  it('should give last N characters of content', () => {
    assert.strictEqual(lastNChars('hello', 2), 'lo');
    assert.strictEqual(lastNChars('world', 3), 'rld');
    assert.strictEqual(lastNChars('bye', 1), 'e');
  });

  it('should give content, if greater count provided', () => {
    assert.strictEqual(lastNChars('hello', 6), 'hello');
    assert.strictEqual(lastNChars('say', 4), 'say');
  });
});

describe('lastNLines', () => {
  it('should give last N lines of content', () => {
    assert.strictEqual(lastNLines('hello\nworld', 1), 'world');
    assert.strictEqual(lastNLines('say\nbye\nto', 2), 'bye\nto');
  });

  it('should give content, if greater count is given', () => {
    assert.strictEqual(lastNLines('hello\nworld', 3), 'hello\nworld');
    assert.strictEqual(lastNLines('say\nbye\nto', 4), 'say\nbye\nto');
  });
});

