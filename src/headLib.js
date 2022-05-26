const { splitLines, joinLines } = require('./stringUtils.js');

const { parseArgs } = require('./parseArgs.js');

const firstNChars = (content, count) => content.slice(0, count);

const formatContent = (title, content) => `==> ${title} <==\n` + content;

const firstNLines = (content, count) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, count));
};

const getFunctionToCall = (option) =>
  option.name === '-n' ? firstNLines : firstNChars;

const head = (content, option) => {
  const funcToCall = getFunctionToCall(option);
  const count = option.value;
  return funcToCall(content, count);
};

const headMain = function (readFile, logger, args) {
  const { files, option } = parseArgs(args);

  let exitCode = 0;
  files.forEach((file) => {
    try {
      const content = readFile(file, 'utf8');
      let headContent = head(content, option);
      if (files.length > 1) {
        headContent = `${formatContent(file, headContent)}`;
      }
      logger.stdOut(headContent);
    } catch (err) {
      logger.stdError(`head: ${file}: No such file or directory`);
      exitCode = 1;
    }
  });
  return exitCode;
};

exports.head = head;
exports.headMain = headMain;
exports.firstNLines = firstNLines;
exports.firstNChars = firstNChars;
