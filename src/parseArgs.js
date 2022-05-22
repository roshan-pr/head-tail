const { iterator } = require('./iterator.js');

const parseOption = function (iterator) {
  const argument = iterator.nextArg();
  const { files, option } = this;

  if (argument.startsWith('-')) {
    option.name = argument[1];
    option.value = +iterator.nextArg();
  } else {
    files.push(argument);
  }

  return { files, option };
};

const parseArgs = args => {
  const parsedIterator = iterator(args);

  const parsedOption = parseOption.bind({
    files: [], option: { name: 'n', value: 10 }
  });
  let parsedArgs = {};
  while (parsedIterator.hasMoreArg()) {
    parsedArgs = parsedOption(parsedIterator);
  }
  return parsedArgs;
};

exports.parseArgs = parseArgs;
