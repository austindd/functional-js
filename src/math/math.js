const { curry } = require('../composition/composition');


// Standard operators:
const increment = a => ++a;
const decrement = a => --a;
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const mod = (a, b) => a % b;

// Others:
const isEven = a => (a % 2 === 0 ? true : false);
const isOdd = a => (a % 2 === 1 ? true : false);
const greatestOf = (a, b) => (a > b ? a : b);
const leastOf = (a, b) => (a < b ? a : b);

module.exports = {
  increment: curry(increment),
  decrement: curry(decrement),
  add: curry(add),
  subtract: curry(subtract),
  multiply: curry(multiply),
  divide: curry(divide),
  mod: curry(mod),
  isEven: curry(isEven),
  isOdd: curry(isOdd),
  greatestOf: curry(greatestOf),
  leastOf: curry(leastOf)
};



