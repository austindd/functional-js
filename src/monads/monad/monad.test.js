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
        .join();
      return (test === 19);
    },

    function mapFor1() {
      const test = Monad.lift(0)
        .trace()
        .mapFor(3, (x) => {
          return x + 5
        }).join()
      return (test === 15);
    },

    function mapWhile1() {
      const test = Monad.lift(1)
        .mapWhile((x) => x < 4 ? true : false, add(1))
        .join()
      return (test === 4);
    },

    function pipe1() {
      const test = Monad.lift(0)
        .pipe(
          add(1),
          add(1),
          add(2)
        ).join();
      return (test === 4);
    },

    function pipeWhen1() {
      const test = Monad.lift(0)
        .pipeWhen((x) => { return x === 0; },
          add(-1),
          add(-1)
        ).join();
      return (test === -2);
    },

    function pipeFor1() {
      const test = Monad.lift(0)
        .pipeFor(8, add(1), add(2))
        .join();
      return (test === 24);
    },

    function pipeWhile1() {
      const test = Monad.lift(0)
        .pipeWhile(x => { return (x < 100 === true );},
          add(2),
          add(2),
          add(2),
          add(4)
        )
        .join();
      return (test === 10);
    },

    function whilePipe1() {
      const test = Monad.lift(0)
        .whilePipe(x => (x < 100 === true),
          add(1),
          add(1),
          add(1)
        ).join();
      return (test === 102);
    },

    function doFor1() {
      let test = 0;
      try {
      
      const m = Monad.lift(5)
        .doFor(10, x => { test = test + x; })
        .join()
        console.dir(m);
      } catch (err) {
        console.log(err);
      }

      return (test === 50);
    }
    
  ];

  return tests;
}

module.exports = {
  testMonad: testMonad()
};
