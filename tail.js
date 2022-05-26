const fs = require('fs');

const { tailMain } = require('./src/tailLib.js');

const main = () => {
  let exitCode = 1;

  try {
    exitCode = tailMain(fs.readFileSync,
      { stdOut: console.log, stdError: console.error }, process.argv.slice(2));
  } catch (error) {
    console.error('tail:', error.message);
    console.log('usage: tail [-r] [-q] [-c # | -n #] [file ...]');
  }

  process.exit(exitCode);
};

main();
