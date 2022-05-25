const { parseArgs } = require('./parseArgs.js');

const { splitLines, joinLines } = require('./stringUtils.js');

const getHeader = (title) => `==> ${title} <==\n`;

const isMoreThanOne = (elements) => elements.length > 1;

const lastNLines = (content, count) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(-count));
};

const lastNChars = (content, count) => content.slice(-count);

const tail = (content, option) => {
  const fnToCall = option.name === '-n' ? lastNLines : lastNChars;
  return fnToCall(content, option.value);
};

const processFiles = (readFile, args) => {
  const { files, option } = args;

  return files.map((file) => {
    const tailContent = { isError: false };
    try {
      const content = readFile(file, 'utf8');
      tailContent.content = tail(content, option);
      tailContent.header = getHeader(file);
    } catch (error) {
      tailContent.isError = true;
      tailContent.error = {
        name: 'FileReadError',
        message: `${file}: No such file or directory`,
        fileName: file
      };
    }
    return tailContent;
  });
};

const displayMessage = (logger, report) => {
  let exitCode = 0;
  report.forEach(tail => {
    if (tail.isError) {
      logger.stdError('tail:', tail.error.message);
      exitCode = 1;
    }
    if (isMoreThanOne(report)) {
      logger.stdOut(`${tail.header}${tail.content}`);
    } else {
      logger.stdOut(tail.content);
    }
  });
  return exitCode;
};

const tailMain = (readFile, logger, args) => {
  const parsedArgs = parseArgs(args);

  const tails = processFiles(readFile, parsedArgs);
  return displayMessage(logger, tails);
};

exports.tail = tail;
exports.tailMain = tailMain;
exports.lastNChars = lastNChars;
exports.lastNLines = lastNLines;
