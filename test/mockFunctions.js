const assert = require('assert');

const mockReadFileSync = function (mockFiles) {
  let index = 0;
  return (fileName, encoding) => {
    assert.strictEqual(mockFiles[index].name, fileName);
    assert.strictEqual(encoding, 'utf8');
    const mockContent = mockFiles[index].content;
    index++;
    return mockContent;
  };
};

const mockConsole = function (content, expected) {
  let index = 0;
  return (actual) => {
    assert.strictEqual(actual, expected[index], 'In mock print');
    content.push(actual);
    index++;
  };
};

exports.mockConsole = mockConsole;
exports.mockReadFileSync = mockReadFileSync;
