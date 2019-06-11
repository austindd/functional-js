
// Standard operators:
const increment = a => ++a;
const decrement = a => --a;
const add = a => b => a + b;
const subtract = a => b => a - b;
const multiply = a => b => a * b;
const divide = a => b => a / b;
const mod = a => b => a % b;

// Others:
const greatestOf = a => b => (a > b ? a : b);
const leastOf = a => b => (a < b ? a : b);


module.exports = {
  increment: increment,
  decrement: decrement,
  add: add,
  subtract: subtract,
  multiply: multiply,
  divide: divide,
  mod: mod,
  greatestOf: greatestOf,
  leastOf: leastOf
};
