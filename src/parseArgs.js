const { iterator } = require('./iterator.js');

const { groupValidOption } = require('./groupValidateOption.js');

const isEmpty = (array) => array.length === 0;

const parseOption = function (iterator) {
  const argument = iterator.currentArg();
  const { files, options } = this;

  if (files.length > 0) {
    files.push(argument);
  } else if (argument.startsWith('-')) {
    const [option, count] = [argument, iterator.nextArg()];
    options.push(groupValidOption({ option, count }));
  } else {
    files.push(argument);
  }

  iterator.nextArg();
  return { files: files, options: options };
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

const getOption = (options) => {
  const [firstOption] = [...options];
  return options.reduce((obj, option) => {
    if (firstOption.name !== option.name) {
      throw {
        name: 'bad option',
        message: 'can\'t combine line and byte counts'
      };
    }
    return option;
  }, { firstOption });
};

const setDefault = () => {
  return { name: '-n', value: 10 };
};

const parseArgs = args => {
  const argsIterator = iterator(splitOptions(args));
  const parsedOption = parseOption.bind({ files: [], options: [] });

  let groupedArgs = {};
  while (argsIterator.hasMoreArg()) {
    groupedArgs = parsedOption(argsIterator);
  }
  const option = isEmpty(groupedArgs.options) ? setDefault() :
    getOption(groupedArgs.options);

  return { files: groupedArgs.files, option };
};

exports.parseArgs = parseArgs;
