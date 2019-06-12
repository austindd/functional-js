const { Monad } = require("./monad.js");
const { runTestArray } = require("../../../test/lib/run-test-array/run-test-array.js");
const { add, subtract, multiply } = require("../../math/math.js");

function testMonad() {

  const tests = [
    function lift1() {
      const test = Monad.lift(1);
      return (test instanceof Monad === true);
    },
    function join1() {
      const test = Monad.lift(0).join();
      return (test === 0);
    },

    function map1() {
      const test = Monad.lift(1).map(add(1)).join();
      return (test === 2);
    },

    function map2() {
      const test = Monad.lift(0)
        .map(add(1))
        .map(add(-1))
        .map(add(8))
        .map(multiply(3))
        .join()
      return (test === 24);
    },

    function mapWhen1() {
      const test = Monad.lift(0)
        .map(add(1))
        .mapWhen((x) => { return typeof x === "number" }, add(18))
        .trace()
        .join();
      return test === 19;
    },

    function mapWhile1() {
      const test = Monad.lift(1)
        .mapwhile((x) => x < 4, (x) => x + 1)
        .join()
      console.dir(test);
      return (test === 4);
    },
    
  ];

  return tests;
}

module.exports = {
  testMonad: testMonad()
};
