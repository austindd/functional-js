const C = require("./composition");

function testComposition() {
  const tests = [

    function curry1() {
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
    function curry2() { 
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
    function curry3() {
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
    function curry4() {
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

      console.dir(add(1,2));
      console.dir(concat3(1, 2, 3));
      console.dir(test.map((item, i) => [i, item]));
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
