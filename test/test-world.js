const path = require('path');
const { requireDir } = require("./require-dir");

const lib = requireDir(path.join(__dirname, "./lib"), ".js");
console.log("\r\nImporting Test Utility Library: \r\n", lib);

const rawTestModules = requireDir(path.join(__dirname, "../src"), ".test.js");
console.log("\r\nImporting Test Modules: \r\n", rawTestModules);

const testModules = Object.keys(rawTestModules).map((name, fn) => {
  const testMod = rawTestModules[name];
  let testArray;
  if (typeof testMod === "function") {
    testArray = testMod();
  } else if (typeof testMod === "object" && Array.isArray(testMod)) {
    testArray = testMod;
  } else throw new TypeError("Test module exports must be an array or a function returning an array.");
  const output = { moduleName: name, tests: testArray };
  return output;
});

(function testWorld(allTestModules) {
  const passed = [];
  const failed = [];
  const errors = [];

  const finalResults = allTestModules.reduce(function executeModule(accumulator, moduleObj, index) {
    
    const moduleResults = moduleObj.tests.map(function executeTests(test, index) {
      
      const testResult = lib.runTest(test);
      testResult.moduleName = moduleObj.moduleName;

      if (testResult.result === true) {
        console.log("passed")
        passed.push(testResult);
      } else if (testResult.result === false) {
        console.log("passed")
        failed.push(testResult);
      } else {
        console.log("error")
        errors.push(testResult);
      }

      return testResult;

    });

    return accumulator.concat(moduleResults);

  }, []);
  
  console.dir(finalResults);

  const globalResults = {
    testsPassed: passed.length,
    testsFailed: failed.length,
    errors: errors.length,
  }

  console.table(globalResults);
  return finalResults;

})(testModules);

function objectToArray(obj) {
  Object.keys(obj).map((key) => {
    return obj[key];
  });
}

