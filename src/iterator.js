const iterator = function (args) {
  let index = 0;
  const hasMoreArg = function () {
    return args.length > index;
  };

  const nextArg = function () {
    index++;
    return args[index];
  };

  const currentArg = function () {
    return args[index];
  };

  return {
    nextArg: nextArg,
    currentArg: currentArg,
    hasMoreArg: hasMoreArg
  };
};

exports.iterator = iterator;
