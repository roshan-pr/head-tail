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

  const restOf = function () {
    const rest = args.slice(index);
    index = args.length;
    return rest;
  };

  return {
    nextArg: nextArg,
    currentArg: currentArg,
    hasMoreArg: hasMoreArg,
    restOf: restOf
  };
};

exports.iterator = iterator;
