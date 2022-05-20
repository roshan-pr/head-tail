const { splitLines, joinLines } = require('./stringUtils.js');

const sliceFromStart = (content, count) => content.slice(0, count);

const head = (content, { delimiter, count = 3 }) => {
  const lines = splitLines(content, delimiter);
  const headedContent = sliceFromStart(lines, count);
  return joinLines(headedContent, delimiter);
};

exports.head = head;
exports.sliceFromStart = sliceFromStart;
