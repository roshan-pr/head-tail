const { iterator } = require('./iterator.js');

const parseOption = function (iterator) {
  const argument = iterator.currentArg();
  const { files, option } = this;

  if (files.length > 0) {
    files.push(argument);
  } else if (argument.startsWith('-')) {
    option.name = argument[1];
    option.value = +iterator.nextArg();
  } else {
    files.push(argument);
  }

  iterator.nextArg();
  return { files, option };
};

const splitOptions = function (args) {
  return args.flatMap(arg => {
    if (arg.startsWith('-')) {
      return isFinite(arg.slice(1)) ?
        [arg[0], arg.slice(1)] : [arg.slice(0, 2), arg.slice(2)];
    }
    return arg;
  }).filter(arg => arg);
};

const parseArgs = args => {
  const argsIterator = iterator(splitOptions(args));
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
