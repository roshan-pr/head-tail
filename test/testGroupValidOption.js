const assert = require('assert');

const { groupValidOption } = require('../src/groupValidateOption.js');

describe('groupValidOption', () => {
  it('should throw error head -a a.txt', () => {
    const option = { option: '-a' };
    assert.throws(() => groupValidOption(option),
      {
        name: 'bad option',
        message: 'illegal option -- a'
      });
  });

  it('should throw error head -n 0 a.txt', () => {
    const option = { option: '-n', count: '0' };
    assert.throws(() => groupValidOption(option),
      {
        name: 'bad count',
        message: 'illegal line count -- 0'
      });
  });

  it('should throw error head -c 0 a.txt', () => {
    const option = { option: '-c', count: '0' };
    assert.throws(() => groupValidOption(option),
      {
        name: 'bad count',
        message: 'illegal byte count -- 0'
      });
  });

  it('should throw error head -c a.txt', () => {
    const option = { option: '-c', count: 'a.txt' };
    assert.throws(() => groupValidOption(option),
      {
        name: 'bad count',
        message: 'illegal byte count -- a.txt'
      });
  });

  it('should group valid options', () => {
    const option = { option: '-c', count: '2' };
    assert.deepStrictEqual(groupValidOption(option),
      { name: '-c', value: 2 });
  });

  it('should group valid options', () => {
    const option = { option: '-n', count: '2' };
    assert.deepStrictEqual(groupValidOption(option),
      { name: '-n', value: 2 });
  });
});
