const fs = require('fs');

const { headMain } = require('./src/headLib.js');

const main = () => {
  try {
    headMain(fs.readFileSync, {
      log: console.log, error: console.error
    }, process.argv.slice(2));
  } catch (error) {
    // console.log(error.message);
    console.error('usage: head [-n lines | -c bytes] [file ...]');
  }
};

main();
