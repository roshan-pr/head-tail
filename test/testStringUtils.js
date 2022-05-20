const assert = require('assert');

const { splitLines, joinLines } = require('../src/stringUtils.js');

describe('splitLines', () => {
  it('should split with content delimiter ""', () => {
    assert.deepStrictEqual(splitLines('hello', ''), ['h', 'e', 'l', 'l', 'o']);
    assert.deepStrictEqual(splitLines('a\nb', ''), ['a', '\n', 'b']);
  });

  it('should split with content delimiter \n', () =>
    assert.deepStrictEqual(splitLines('say\nbye', '\n'), ['say', 'bye']));
});

describe('joinLines', () => {
  it('should join content with delimiter ""', () => {
    assert.deepStrictEqual(joinLines(['h', 'e', 'l', 'l', 'o'], ''), 'hello');
    assert.deepStrictEqual(joinLines(['a', '\n', 'b'], ''), 'a\nb');
  });

  it('should join content with delimiter \n', () =>
    assert.deepStrictEqual(joinLines(['say', 'bye'], '\n'), 'say\nbye'));
});
