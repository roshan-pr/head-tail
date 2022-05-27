const { splitLines, joinLines } = require('./stringUtils.js');

const { parseArgs } = require('./parseArgs.js');

const firstNChars = (content, count) => content.slice(0, count);

const createHeader = (title) => `==> ${title} <==\n`;

const firstNLines = (content, count) => {
  const lines = splitLines(content);
  return joinLines(lines.slice(0, count));
};

const getHeadFilter = (option) =>
  option.name === '-n' ? firstNLines : firstNChars;

const head = (content, option) => {
  const filterHead = getHeadFilter(option);
  return filterHead(content, option.value);
};

const getExitCode = (reports) =>
  reports.some((report) => report.error) ? 1 : 0;

const headOfFile = (file, option, readFile) => {
  const result = { file };
  try {
    const content = readFile(file, 'utf8');
    result.content = head(content, option);
  } catch (err) {
    result.error = `head: ${file}: No such file or directory`;
  }
  return result;
};

const getFormatter = (reports) => {
  if (reports.length > 1) {
    return (report) => createHeader(report.file) + report.content;
  }
  return (report) => report.content;
};

const print = (report, logger, formatter) => {
  if (report.error) {
    logger.stdError(report.error);
    return;
  }
  logger.stdOut(formatter(report));
};

const printResult = (headReports, logger) => {
  const formatter = getFormatter(headReports);
  headReports.forEach((report) => print(report, logger, formatter));
};

const headMain = function (readFile, logger, args) {
  const { files, option } = parseArgs(args);
  const headReports = files.map((file) => headOfFile(file, option, readFile));

  printResult(headReports, logger);
  return getExitCode(headReports);
};

exports.head = head;
exports.headMain = headMain;
exports.firstNLines = firstNLines;
exports.firstNChars = firstNChars;
exports.printResult = printResult;
