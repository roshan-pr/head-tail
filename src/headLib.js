const { splitLines, joinLines } = require('./stringUtils.js');

const { parseArgs } = require('./parseArgs.js');

const getDelimiter = (option) => option.name === 'n' ? '\n' : '';

const sliceFromStart = (content, count) => content.slice(0, count);

const head = (content, { delimiter, count }) => {
  const lines = splitLines(content, delimiter);
  const headedContent = sliceFromStart(lines, count);
  return joinLines(headedContent, delimiter);
};

const headMain = function (readFile, args) {
  const { files, option } = parseArgs(args);
  const delimiter = getDelimiter(option);
  const count = option.value;

  const content = readFile(...files, 'utf8');
  return head(content, { delimiter, count });
};

exports.head = head;
exports.headMain = headMain;
exports.sliceFromStart = sliceFromStart;
