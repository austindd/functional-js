const { Monad } = require("./monad.js");
const { runTestArray } = require("../../../test/lib/run-test-array/run-test-array.js");
const { add, subtract, multiply } = require("../../math/math.js");




function testMonad() {

  const tests = [

    function map1() {
      let t = Monad.lift(1).map(add(1)).join();
      return (t === 2);
    },

    function map2() {
      let t = Monad.lift(0)
        .map(add(1))
        .map(add(-1))
        .map(add(8))
        .map(multiply(3))
        .join()
      return (t === 24);
    },

  ];

  return tests;
}

module.exports = {
  testMonad: testMonad
};
