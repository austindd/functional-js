const path = require('path');
const { requireDir } = require("./requireDir");
const lib = requireDir(path.resolve(__dirname, "./lib"), ".js");
const tests = requireDir(path.resolve(__dirname, "../src"), ".test.js");

console.log(tests);
console.log(lib);

let testArray = Object.keys(tests).map((name, fn) => {
  console.dir(tests);
  return tests[name];
});

function executeAllTests() {
  let results = lib.runTests(testArray);
  console.table([results]);
}

executeAllTests();

