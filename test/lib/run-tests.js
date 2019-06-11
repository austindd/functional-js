const runTests = (testArray) => {
  return testArray.map((testFn) => {
    let name = testFn.name;
    let result = testFn();
    return [name, result];
  });
}

module.exports = {
  runTests: runTests
}
