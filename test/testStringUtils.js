const assert = require('assert');

const { splitLines, joinLines } = require('../src/stringUtils.js');

describe('splitLines', () => {
  it('should give line, provided single line', () => {
    assert.deepStrictEqual(splitLines('hello'), ['hello']);
    assert.deepStrictEqual(splitLines('bye'), ['bye']);
  });

  it('should split multiple lines', () => {
    assert.deepStrictEqual(splitLines('hello\nworld', '\n'), ['hello', 'world']);
    assert.deepStrictEqual(splitLines('say\nbye', '\n'), ['say', 'bye']);
  });
});

describe('joinLines', () => {
  it('should join content of single line', () => {
    assert.deepStrictEqual(joinLines(['hello']), 'hello');
    assert.deepStrictEqual(joinLines(['bye']), 'bye');
  });

  it('should join multiple lines', () => {
    assert.deepStrictEqual(joinLines(['hello', 'world']), 'hello\nworld');
    assert.deepStrictEqual(joinLines(['say', 'bye']), 'say\nbye');
  });
});
