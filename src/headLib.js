const { splitLines, joinLines } = require('./stringUtils.js');

const sliceFromStart = (content, count) => content.slice(0, count);

const head = (content, { delimiter, count = 3 }) => {
  const lines = splitLines(content, delimiter);
  const headedContent = sliceFromStart(lines, count);
  return joinLines(headedContent, delimiter);
};

const headMain = function (readFile, { ...args }) {
  const { fileName, options } = args;
  const content = readFile(fileName, 'utf8');
  return head(content, options);
};

exports.head = head;
exports.headMain = headMain;
exports.sliceFromStart = sliceFromStart;
