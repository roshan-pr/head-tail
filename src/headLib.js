const NEWLINE = '\n';

const splitLines = (content) => content.split(NEWLINE);

const joinLines = (content) => content.join(NEWLINE);

const headOfLines = (lines, count) => lines.slice(0, count);

const head = (content) => {
  const lines = splitLines(content);
  return joinLines(headOfLines(lines, 3));
};

exports.head = head;
exports.headOfLines = headOfLines;
