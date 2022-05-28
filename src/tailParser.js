const isOption = (flag) => flag?.startsWith('-');

const createOption = (flag, limit) => {
  return { flag, limit: +limit };
};

const tailParser = (args) => {
  const options = [];
  let index = 0;
  while (isOption(args[index])) {
    options.push(
      createOption(args[index], args[index + 1])
    );
    index += 2;
  }
  const files = args.slice(index);

  return { options, files };
};

exports.tailParser = tailParser;
