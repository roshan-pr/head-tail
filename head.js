const fs = require('fs');

const { headMain } = require('./src/headLib.js');

// eslint-disable-next-line no-process-exit
const exit = (code) => process.exit(code);

const main = () => {
  let exitCode = 1;
  try {
    exitCode = headMain(fs.readFileSync, {
      stdOut: console.log, stdError: console.error
    }, process.argv.slice(2));
  } catch (error) {
    // console.log(error.message);
    console.error('usage: head [-n lines | -c bytes] [file ...]');
  }
  exit(exitCode);
};

main();
