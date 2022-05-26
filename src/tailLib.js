const { parseArgs } = require('./parseArgs.js');

const { splitLines, joinLines } = require('./stringUtils.js');

const getHeader = (title) => `==> ${title} <==\n`;

const getFormatter = (elements) => {
  if (elements.length > 1) {
    return (report) => getHeader(report.file) + report.content;
  }
  return (report) => report.content;
};

const lastNLines = (content, count) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(-count));
};

const lastNChars = (content, count) => content.slice(-count);

const tail = (content, option) => {
  const tailFilter = option.name === '-n' ? lastNLines : lastNChars;
  return tailFilter(content, option.value);
};

const processFile = (file, option, readFile) => {
  const result = { file };

  try {
    const content = readFile(file, 'utf8');
    result.content = tail(content, option);
  } catch (error) {
    result.error = {
      name: 'FileReadError', message: `${file}: No such file or directory`,
    };
  }
  return result;
};

const displayMsg = (report, logger, formatter) => {
  if (report.error) {
    logger.stdError('tail: ' + report.error.message);
  }
  logger.stdOut(formatter(report));
};

const tailMain = (readFile, logger, args) => {
  const { files, option } = parseArgs(args);

  const tailReports = files.map((file) => processFile(file, option, readFile));
  const formatter = getFormatter(tailReports);

  tailReports.forEach((report) => displayMsg(report, logger, formatter));
  return 0;
};

exports.tail = tail;
exports.tailMain = tailMain;
exports.lastNChars = lastNChars;
exports.lastNLines = lastNLines;
