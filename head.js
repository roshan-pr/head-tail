const fs = require('fs');

const { headMain } = require('./src/headLib.js');

const main = () => {
  let exitCode = 1;
  try {
    const logger = { stdOut: console.log, stdError: console.error };
    exitCode = headMain(fs.readFileSync, logger, process.argv.slice(2));
  } catch (error) {
    console.error('head', error.message);
    console.error('usage: head [-n lines | -c bytes] [file ...]');
  }

  process.exit(exitCode);
};

main();
