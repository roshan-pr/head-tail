const tailParser = (args) => {
  const [flag, limit] = args;
  const option = { name: flag, limit: +limit };
  return { option };
};

exports.tailParser = tailParser;
