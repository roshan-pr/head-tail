const { iterator } = require('./iterator.js');

const { groupValidOption } = require('./groupValidateOption.js');

const isEmpty = (array) => array.length === 0;

const isOption = (argument) => argument.startsWith('-');

const parseOption = function (iterator) {
  const argument = iterator.currentArg();
  const { files, options } = this;

  if (isOption(argument)) {
    const [option, count] = [argument, iterator.nextArg()];
    options.push(groupValidOption({ option, count }));
  } else {
    files.push(...iterator.restOf());
  }

  iterator.nextArg();
  return { files: files, options: options };
};

const splitAt = (arg, pos) => [arg.slice(0, pos), arg.slice(pos)];

const isNumericOption = (arg) => isFinite(arg);

const splitArg = arg => {
  if (isOption(arg)) {
    return isNumericOption(arg) ? [splitAt(arg, 1)] : splitAt(arg, 2);
  }
  return arg;
};

const splitCmdArgs = function (args) {
  return args.flatMap(splitArg).filter(arg => arg);
};

const getOption = (options) => {
  const [firstOption] = [...options];
  return options.reduce((obj, option) => {
    if (obj.name !== option.name) {
      throw {
        name: 'invalid options', message: 'can\'t combine line and byte counts'
      };
    }
    return option;
  }, { ...firstOption });
};

const setDefault = () => {
  return { name: '-n', value: 10 };
};

const parseArgs = args => {
  const argsIterator = iterator(splitCmdArgs(args));
  const parsedOption = parseOption.bind({ files: [], options: [] });

  let groupedArgs = {};
  while (argsIterator.hasMoreArg()) {
    groupedArgs = parsedOption(argsIterator);
  }
  const option = isEmpty(groupedArgs.options) ? setDefault() :
    getOption(groupedArgs.options);

  return { files: groupedArgs.files, option };
};

exports.splitOptions = splitCmdArgs;
exports.parseArgs = parseArgs;
