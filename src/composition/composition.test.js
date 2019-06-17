const C = require("./composition");

function testComposition() {
  const tests = [

    function curry_001() {
      const testArr = [];
      const func1 = C.curry(function(a, b, c) {
        return a + (b * c);
      });
      
      testArr.push(func1 === func1);

      const func2 = func1(3);
      // Is 'curry' returning a funtion?
      testArr.push(typeof func2 === "function"); 
      // Is 'curry' waiting for all arguments to be provided?
      testArr.push(typeof func2()()()()() === "function");
      
      const func3 = func2(4);
      testArr.push(typeof func3 === "function");
      testArr.push(typeof func3()()()()() === "function");

      const final = func3(8);
      // Is the function completed when all arguments are provided?
      testArr.push(typeof final === "number");
      testArr.push(final === 35);

      return allTrue(testArr);
    },

    // Testing whether the 'curry' function works for prototype
    // methods on classes.
    function curry_002() { 
      class Klass {
        constructor(val) {
          this.val = val;
        }
        add(a, b, c) {
          return a + b + c;
        }
        valueOf() {
          return this.value;
        }
      }
      Klass.prototype.add = C.curry(Klass.prototype.add);
      const klass = new Klass(2);
      const add0 = klass.add(0);
      const test = [
        typeof klass === "object",
        typeof add0 === "function",
        add0 !== klass.add,
        add0(2)(8) === 10,
      ];

      return allTrue(test);
    },

    // Does context work properly within class methods?
    function curry_003() {
      class Klass {
        constructor(val) {
          this.val = val;
        }
        getThis(a, b) {
          return this;
        }
        valueOf() {
          return this.value;
        }
      }
      
      Klass.prototype.getThis = C.curry(Klass.prototype.getThis);
      const klass = new Klass(0);
      const getKlass = klass.getThis(1);

      const test = [
        typeof klass === "object",
        typeof getKlass === "function",
        klass.getThis(4)(5) === klass 
      ];

      return allTrue(test);
    },
    
    // Can curried functions still be fully applied with tuples?
    function curry_004() {
      const _add = (a, b) => a + b;
      const _concat3 = (str1, str2, str3) => "" + str1 + str2 + str3;

      const add = C.curry(_add);
      const concat3 = C.curry(_concat3);

      const test = [
        typeof add(1) === "function",
        typeof add(1)(2) === "number",
        typeof add(1, 2) === "number",
        add(1)(2) === 3,
        add(1, 2) === 3,
        add()(1, 2) === 3,
        typeof concat3("1") === "function",
        typeof concat3("1")("2")("3") === "string",
        typeof concat3("1", "2", "3") === "string",
        concat3(1)(2)(3) === "123",
        concat3(1, 2, 3) === "123",
        concat3(1, 2)(3) === "123",
        concat3(1)(2, 3) === "123",
        concat3()(1, 2, 3) === "123" 
      ];

      return allTrue(test);
    },

    function compose_001() {
      const add = a => b => a + b;
      const multiply = a => b => a * b;
      const test = [
        typeof C.compose(add(1), multiply(3)) === "function",
        C.compose(add(1), multiply(3))(0) === 1,
        C.compose(add(1), multiply(3))(2) === 7,
        C.compose(add(5), multiply(2))(6) === 17,
        C.compose(add(5), add(4), multiply(2), add(-2))(0) === 5
      ];

      return allTrue(test);
    }

  ];

  return tests;
}

function allTrue(arr) {
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
      })();
    }
  }
}


module.exports = {
  testComposition: testComposition
}
