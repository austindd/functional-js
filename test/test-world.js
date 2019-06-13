const path = require('path');
const { requireDir } = require("./require-dir");

const lib = requireDir(path.join(__dirname, "./lib"), ".js");
console.log("\r\nImporting Test Utilities: \r\n", lib);

const rawTestModules = requireDir(path.join(__dirname, "../src"), ".test.js");
console.log("\r\nImporting Test Modules: \r\n", rawTestModules);

const testModules = Object.keys(rawTestModules).map((name, fn) => {
  const testMod = rawTestModules[name];
  let testArray;
  if (typeof testMod === "function") {
    try {
      testArray = testMod();
    } catch (err) {
      console.warn(error);
      testArray = [ function module_error_no_op() {} ]
    }
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
        testResult.result = "PASS"
        passed.push(testResult);
      } else if (testResult.result === false) {
        testResult.result = "FAIL"
        failed.push(testResult);
      } else {
        errors.push(testResult);
      }

      return testResult;

    });

    return accumulator.concat(moduleResults);

  }, [])
  
  const globalResults = {
    "Tests Passed": passed.length,
    "Tests Failed": failed.length,
    "Errors": errors.length,
  }

  console.table(finalResults.map((test) => {
    return {
      "Module": test.moduleName,
      "Test Function": test.name,
      "Result": test.result
    };
  }));
  console.table(globalResults);
  return finalResults;

})(testModules);

function objectToArray(obj) {
  return Object.keys(obj).map((key) => {
    return obj[key];
  });
}

