## **-- TAIL --**

**TODO**
- [ ] Edit README.md, add tail contract.
  - [ ] Create test file for tail.
  - [ ] Add happy path tests for tail.

***
***

## **-- HEAD --**

**TODO**


**MAYBE**

- [ ] Consider different data structure for head.

**DONE**

- [x] Consider Change structure of a general function of splitFromStart.
 - [x] Split into separate functions for line and bytes.
- [x] Change contract for string utils.
- [x] Added test for split options.
- [x] Validate options, throw error from parser.
 - [x] For option value is zero.
 - [x] For invalid option.
 - [x] Throw from parser, catch in head.js
- [x] Add exit code to headMain.
- [x] Pass console to headMain as a parameter.
- [x] Make head work for multiple files.
- [x] Change head contract
- [x] Extract default form head.js.
- [x] Parse the option in headMain 
- [x] Consider to set default count of line numbers as 10.
 - [x] Fix test cases.
- [x] Implement parseArgs
  - [x] Takes arguments and return obj { files: [...], option: {option:'n', value:2}}.
- [x] Implement try catch block for main in head.js.
- [x] Implement main in head.js.
  - [x] Use single file from command line `head file`.
- [x] Implement headMain taking readFile and options.
  - [x] Starts headMain with readFile, filename and options.
  - [x] Arguments to headMain is readFile and options.
  - [x] Test with mocking readFileSync function.
- [x] Implement count option to head (-n).
- [x] Implement bytes option to head (-c).
- [x] Consider changing names of headOfLines ~~~and head~~~.
- [x] Implement options as a parameter to head.
  - [x] Use objects for sending options.
  - [x] Change the contract of head function.
- [x] Move the split, join and constant to separate file
- [x] Implement test for headOfLines.
- [x] Consider smaller value for default count.
- [x] Use hardcode content, no external input.
- [x] Separate '\n' as a constant
- [x] Extract split and join into functions.
- [x] Make a headOfLine, returns the lines of given count.
 - [x] Split the content to multiple lines in head.
- [x] Make test case for Multiple lines.
- [x] Investigate `head` utility.
- [x] Make mocha watch.
- [x] Write a test case (happy path).
- [x] Make headLib.js in src.
- [x] Make testHeadLib.js in test.
- [x] Create src and test directory structure.
