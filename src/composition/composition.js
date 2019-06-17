
// Allows passing "tuples" (implemented as arrays) as
// individual function arguments.
// If one parameter takes an array, the array should be
// nested within the "tuple" (arguments) array.

function enableTuples(fn) {
  return function allowingTuples(args) {
    if (Array.isArray(args)) return fn.apply(fn, args)
    else return fn(args);
    
  };
}

// Warning: Do not use 'curry' with default parameters!!
// Function.prototype.length will not count any parameters
// that come after a default parameter!

function curry(f) {
  return function curried(...args) {
    let ctx = this; // caching the context
    if (args.length >= f.length) {
      return f.apply(ctx, args);
    }
    return function(...args2) {
    return curried.apply(ctx, args.concat(args2));
    }
  }
}


function pipe(...fns) {
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
  enableTuples: enableTuples,
  curry: curry,
  pipe: pipe,
  trace: trace,
}
