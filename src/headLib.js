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

const headMain = function (readFile, consoler, args) {
  const { files, option } = parseArgs(args);

  let exitCode = 0;
  const { error, log } = consoler;
  files.forEach((file) => {
    let content = '';
    try {
      content = readFile(file, 'utf8');
      let contentHead = head(content, option);
      if (files.length > 1) {
        contentHead = `${formatContent(file, contentHead)}`;
      }
      log(contentHead);
    } catch (err) {
      error(`head: ${file}: No such file or directory\n`);
      exitCode = 1;
    }
  });
  return exitCode;
};

exports.head = head;
exports.headMain = headMain;
exports.sliceFromStart = sliceFromStart;
