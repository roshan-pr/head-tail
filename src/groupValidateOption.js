const getValidCount = ({ name, count }) => {
  if (!(count > 0)) {
    throw {
      name: 'bad count',
      message: `illegal ${name} count -- ${count}`
    };
  }
  return +count;
};

const getValidOption = ({ option }) => {
  const keys = { 'n': 'line', 'c': 'byte' };
  const notation = option[1] || 'n';

  if (!keys[notation]) {
    throw {
      name: 'bad option',
      message: `illegal option -- ${notation}`
    };
  }
  return [`-${notation}`, keys[notation]];
};

const groupValidOption = function ({ option, count }) {
  const [notation, name] = getValidOption({ option, count });
  const value = getValidCount({ name, count });
  if (!count > 0) {
    throw { message: 'option requires an argument', option };
  }
  return { name: notation, value };
};

exports.groupValidOption = groupValidOption;
