const { tail } = require('../src/tailLib.js');

const assert = require('assert');

describe('tail', () => {
  it('should return given content', () =>
    assert.strictEqual(tail('hello'), 'hello'));
});

