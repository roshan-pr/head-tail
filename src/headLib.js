const { splitLines, joinLines } = require('./stringUtils.js');

const { parseArgs } = require('./parseArgs.js');

const getDelimiter = (option) => option.name === 'n' ? '\n' : '';

const sliceFromStart = (content, count) => content.slice(0, count);

const head = (content, option) => {
  const delimiter = getDelimiter(option);
  const count = option.value;

  const lines = splitLines(content, delimiter);
  const headedContent = sliceFromStart(lines, count);
  return joinLines(headedContent, delimiter);
};

const formatContent = (title, content) => `==> ${title} <==\n` + content;

const headMain = function (readFile, args) {
  const { files, option } = parseArgs(args);

  return files.map((file) => {
    let content;
    try {
      content = readFile(file, 'utf8');
    } catch (error) {
      return {
        isError: true,
        value: `head: ${file}: No such file or directory`
      };
    }
    const contentHead = head(content, option);
    if (files.length > 1) {
      return {
        isError: false,
        value: `${formatContent(file, contentHead)}`
      };
    }
    return { isError: false, value: contentHead };
  });
};

exports.head = head;
exports.headMain = headMain;
exports.sliceFromStart = sliceFromStart;
