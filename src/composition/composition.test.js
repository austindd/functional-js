const C = require("./composition");

function mergeResults(arr) {
  return arr.reduce((didPass, isTrue) => { 
    if (didPass !== true) {
      return false;
    } else return isTrue;
  }, true);
}

function inject(dep) {
  return {
    toContext: function toContext(context) {
      const _dep = dep.bind(context);
      return (function() {
        _dep.call(this)
        context.call(this)
      })()
    }
  }
}

function testComposition() {
  const tests = [

    function curry1() {
      const testArr = [];
      const func1 = C.curry(function(a, b, c) {
        return a + (b * c);
      });
      
      testArr.push(func1 === func1);

      const func2 = func1(3);
      testArr.push(typeof func2 === "function");
      testArr.push(typeof func2()()()()() === "function");
      
      const func3 = func2(4);
      testArr.push(typeof func3 === "function")
      testArr.push(typeof func3()()()()() === "function");

      const final = func3(8);
      testArr.push(typeof final === "number") 
      testArr.push(final === 35)

      return mergeResults(testArr);
    },

  ];

  return tests;
}

module.exports = {
  testComposition: testComposition
}
