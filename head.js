const fs = require('fs');

const { headMain } = require('./src/headLib.js');

const main = () => {
  try {
    const fileName = process.argv[2];
    const options = { delimiter: '\n', count: 10 };
    console.log(headMain(fs.readFileSync, { fileName, options }));
  } catch (error) {
    console.log(error.message);
    console.log('usage: head [-n lines | -c bytes] [file ...]');
  }
};

main();
