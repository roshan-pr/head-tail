const fs = require('fs');

const { headMain } = require('./src/headLib.js');

const main = () => {
  try {
    const headResult = headMain(fs.readFileSync, process.argv.slice(2));
    headResult.forEach(result => {
      result.isError ? console.error(result.value) : console.log(result.value);
    });
  } catch (error) {
    // console.log(error.message);
    console.error('usage: head [-n lines | -c bytes] [file ...]');
  }
};

main();
