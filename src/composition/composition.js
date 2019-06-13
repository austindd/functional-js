
// Allows passing "tuples" (implemented as arrays) as
// individual function arguments
function enableTuples(fn) {
  return function allowingTuples(args) {
    if (Array.isArray(args)) return fn.apply(fn, args)
    else return fn(args)
    
  };
}
function curry(f) {
return function curried(...args) {
let ctx = this;
if (args.length >= f.length) {
return f.call(ctx, ...args);
}
return function(...args2) {
return curried.call(ctx, ...args, ...args2);
}
}
}

// Warning: Do not use 'curry' with default parameters!!
// Function.prototype.length will not count any parameters
// that come after a default parameter!

function _curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) { // (1)
      return fn.apply(this, args);
    } else {
      return function pass(...args2) { // (2)
        return curried.apply(this, args.concat(args2));
      }
    }
  };
}

function pipe (...fns) {
  return (...args) => {
    let x = fns[0](...args);
    for (let i = 1, n = fns.length; i < n; i++) {
      x = fns[i](x);	
    }
    return x;
  }
}

function trace (x) {
  console.log(x);
  return x;
};

module.exports = {
  enableTuples,
  curry: curry,
  pipe: pipe,
  trace: trace,
}
