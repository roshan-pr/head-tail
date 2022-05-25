const { splitLines, joinLines } = require('./stringUtils.js');

const lastNLines = (content, count) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(-count));
};

const lastNChars = (content, count) => content.slice(-count);

const tail = (content) => {
  const option = '-n';
  const fnToCall = option === '-n' ? lastNLines : lastNChars;
  return fnToCall(content, 10);
};

exports.tail = tail;
exports.lastNChars = lastNChars;
exports.lastNLines = lastNLines;
