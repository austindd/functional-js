const path = require('path');
const runTest = require("../run-test/run-test");

function runTestArray (testArray) {
  return testArray.map((testFunction, index) => {
    return runTest(testFunction);
  });
}

module.exports.runTestArray = runTestArray;
