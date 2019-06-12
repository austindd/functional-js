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
  } else if (typeof testModule === "object" && Array.isArray(testMod)) {
    testArray = testMod;
  } else throw new typeError("Test module exports must be an array or a function returning an array.");
  const output = { moduleName: name, tests: testArray };
  return output;
});

(function executeAllTests(allTestModules) {
  const passed = [];
  const failed = [];
  const errors = [];

  const finalResults = allTestModules.reduce(function executeModule(finalArray, moduleObj, index) {

    
    const moduleResults = moduleObj.tests.map(function executeTests(test, index) {
      
      const testResult = lib.runTest(test);
      testResult.moduleName = moduleObj.moduleName;
      if (testResult.result === true) {
        passed.push(testResult);
      } else if (testResult.result === false) {
        failed.push(testResult);
      } else {
        errors.push(testResult);
      }

      return testResult;

    });

    return finalArray.concat(moduleResults);

  }, []);
  
  console.dir(finalResults);

  const globalResults = {
    testsPassed: passed.length === 0 ? 0 : passed.length - 1,
    testsFailed: failed.length === 0 ? 0 : failed.length - 1,
    errors: errors.length === 0 ? 0 : errors.length - 1,
  }

  console.table(globalResults);
  return finalResults;

})(testModules);

function objectToArray(obj) {
  Object.keys(obj).map((key) => {
    return obj[key];
  });
}

