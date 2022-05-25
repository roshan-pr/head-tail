const { parseArgs } = require('./parseArgs.js');

const { splitLines, joinLines } = require('./stringUtils.js');

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
    } catch (error) {
      tailContent.isError = true;
      tailContent.error = {
        name: 'FileReadError',
        message: `Unable to read ${file}`,
        fileName: file
      };
    }
    return tailContent;
  });
};

const tailMain = (readFile, logger, args) => {
  const parsedArgs = parseArgs(args);

  const tails = processFiles(readFile, parsedArgs);
  tails.forEach(tail => {
    if (tail.isError) {
      logger.stdError(tail.error);
    }
    logger.stdOut(tail.content);
  });
  return 0;
};

exports.tail = tail;
exports.tailMain = tailMain;
exports.lastNChars = lastNChars;
exports.lastNLines = lastNLines;
