const fs = require('fs');

const { tailMain } = require('./src/tailLib.js');

// eslint-disable-next-line no-process-exit
const exit = (code) => process.exit(code);

const main = () => {
  let exitCode = 1;
  try {
    exitCode = tailMain(fs.readFileSync,
      { stdOut: console.log, stdError: console.error }, process.argv.slice(2));
  } catch (error) {
    console.error('head', error.message);
    console.log('usage: tail [-c # | -n #] [file ...]');
  }
  exit(exitCode);
};

main();
