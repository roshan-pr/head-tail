const hasMoreArg = function () {
  return this.index < this.args.length - 1;
};

const nextArg = function () {
  if (!this.hasMoreArg()) {
    throw { message: 'No more elements', name: 'iterator.nextArg()' };
  }
  this.index++;
  return this.args[this.index];
};

const currentArg = function () {
  return this.args[this.index];
};

const iterator = function (args) {
  const obj = { args, index: -1 };
  obj.nextArg = nextArg.bind(obj);
  obj.currentArg = currentArg.bind(obj);
  obj.hasMoreArg = hasMoreArg.bind(obj);
  return obj;
};

exports.iterator = iterator;
