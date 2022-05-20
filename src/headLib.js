const headOfLines = (lines, count) => lines.slice(0, count);

const head = (content) => {
  const lines = content.split('\n');
  return headOfLines(lines, 3).join('\n');
};

exports.head = head;
