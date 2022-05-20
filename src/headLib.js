const { splitLines, joinLines } = require('./stringUtils.js');

const headOfLines = (lines, count) => lines.slice(0, count);

const head = (content) => {
  const lines = splitLines(content);
  return joinLines(headOfLines(lines, 3));
};

exports.head = head;
exports.headOfLines = headOfLines;
