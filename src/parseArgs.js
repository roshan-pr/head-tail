const { iterator } = require('./iterator.js');

const parseOption = function (iterator) {
  const argument = iterator.currentArg();
  const { files, option } = this;

  if (argument.startsWith('-')) {
    option.name = argument[1];
    option.value = +iterator.nextArg();
  } else {
    files.push(argument);
  }

  iterator.nextArg();
  return { files, option };
};

const parseArgs = args => {
  const argsIterator = iterator(args);
  const parsedOption = parseOption.bind({
    files: [], option: { name: 'n', value: 10 }
  });

  let parsedArgs = {};
  while (argsIterator.hasMoreArg()) {
    parsedArgs = parsedOption(argsIterator);
  }
  return parsedArgs;
};

exports.parseArgs = parseArgs;
