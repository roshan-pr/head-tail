const { iterator } = require('./iterator.js');

const parseOption = function (iterator) {
  const argument = iterator.currentArg();
  const option = { name: 'n', value: 10 };
  if (argument.startsWith('-')) {
    option.name = argument[1];
    option.value = +iterator.nextArg();
  }

  return { files: [iterator.nextArg()], option };
};

const parseArgs = args => {
  const parsedIterator = iterator(args);
  const option = { name: 'n', value: 10 };
  let parsedArgs;
  if (!parsedIterator.currentArg().startsWith('-')) {
    return { files: [parsedIterator.currentArg()], option };
  }

  while (parsedIterator.hasMoreArg()) {
    parsedArgs = parseOption(parsedIterator);
  }
  return parsedArgs;
};

exports.parseArgs = parseArgs;
