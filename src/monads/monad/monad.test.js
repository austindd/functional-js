const { Monad } = require("./monad.js");
const { runTests } = require("../../../test/lib/run-tests.js");
const { add, subtract, } = require("../../math/math.js");

function testMonad() {
  const tests = [];
  tests.push(function() {
    let aaa = Monad.lift(1).map(add(1)).join();
    return (aaa === 2);
  });  
  
  return runTests(tests);
}

module.exports = {
  testMonad: testMonad
};
