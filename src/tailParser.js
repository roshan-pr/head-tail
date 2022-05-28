const { iterator } = require('../src/iterator.js');

const isOption = (flag) => {
  return flag && flag.startsWith('-');
};

const createOption = (flag, limit) => {
  return { flag, limit: +limit };
};

const needValue = (givenFlag, config) => {
  const option = config.find(({ flag }) => flag === givenFlag);
  return option && option.valueRequired;
};

const parser = (args, config, options = []) => {
  const iterateArgs = iterator(args);

  let currentArg = iterateArgs.currentArg();
  while (isOption(currentArg)) {
    let option = { flag: currentArg };
    if (needValue(currentArg, config)) {
      option = createOption(currentArg, iterateArgs.nextArg());
    }
    options.push(option);
    currentArg = iterateArgs.nextArg();
  }

  const files = iterateArgs.restOf();
  return { options, files };
};

const tailParser = (args) => {
  const config = [
    { flag: '-n', option: 'lines', valueRequired: true },
    { flag: '-c', option: 'bytes', valueRequired: true },
    { flag: '-r' }
  ];

  return parser(args, config);
};

exports.tailParser = tailParser;
