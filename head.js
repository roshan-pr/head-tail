const fs = require('fs');

const { headMain } = require('./src/headLib.js');

const main = () => {
  try {
    const logger = { stdOut: console.log, stdError: console.error };
    process.exitCode = headMain(fs.readFileSync, logger, process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error('usage: head [-n lines | -c bytes] [file ...]');
    process.exitCode = 1;
  }

};

main();
