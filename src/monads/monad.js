
class Monad {
  constructor(fn) {
    this.fn = fn;
  }
  join() {
    return this.fn();
  }
  lift(value) {
    return new this(() => value);
  }
  map(fn) {
    console.log(this);
    const self = this.constructor;
    return new self(() => fn(this.join()));
  }
  mapWhen(predicate, fn) {
    const _this = this;
    return new _this(() => {
      const value = _this.join();
      if (predicate(value) === true) {
        return fn(value); 
      }
      else return value;
    });
  }
  mapFor (count, fn) {
    const _this = this;
    return new _this(() => {
      const value = _this.join();
      for (let i = 0; i < count - 1; ++i) {
        value = fn(value);
      }
      return value;
    });
  }
  mapWhile (condition, fn) {
    const _this = this;
    return new _this(() => {
      const value = _this.join();
      while (condition(value)) {
        value = fn(value);
      }
      return value;
    });
  }
  do(fn) {
    const value = this.join();
    fn(value);
    return new this(() => value);
  }
  doWhen (predicate, fn) {
    const _this = this;
    return new _this(() => {
      const value = _this.join();
      if (predicate(value) === true) {
        fn(value); 
      }
      return value;
    });
  }
  doFor (count, fn) {
    const _this = this;
    return new _this(() => {
      const value = _this.join();
      for (let i = 0; i < count - 1; ++i) {
        fn(value);
      }
      return value;
    });
  }
  /*  doWhile:: c f => Monad
   *  passes the wrapped value to condition function for while loop
   *  The value will not mutate, so the condition function or 'do' function
   *  must involve a side effect to produce a halting condition.
   *  Prone to infinite loops. Use with caution.
   */
  doWhile (condition, fn) {
    const _this = this;
    return new _this(() => {
      const value = _this.join();
      while (condition(value)) {
        fn(value);
      }
      return value;
    });
  }
  pipe (...fns) {
    const _this = this;
    return new _this(() => {
      let value = _this.join();
      for (let i = 0, n = fns.length - 1; i < n; ++i) {
        value = fns[i](value);
      }
      return value;
    });
  }
  pipeWhen (predicate, ...fns) {
    const _this = this;
    return new _this(() => {
      let value = _this.join();
      if (predicate(value) === true) {
        for (let i = 0, n = fns.length - 1; i < n; ++i) {
          value = fns[i](value);
        }
      }
      return value;
    });
  }
  pipeFor (count, ...fns) {
    const _this = this;
    return new _this(() => {
      let value = _this.join();
      for (let i = 0; i < count - 1; i++) {
        for (let j = 0, n = fns.length - 1; j < n; ++j) {
          value = fns[j](value);
        }
      }
      return value;
    });
  }
  pipeWhile (condition, ...fns) {
    const _this = this;
    return new _this(() => {
      let value = _this.join();
      for (let j = 0, n = fns.length - 1; j < n; ++j) {
        if (condition(value) === true) {
          value = fns[j](value);
        }
      }
      return value;
    });
  }
  pipeAllWhile (condition, ...fns) {
    const _this = this;
    return new _this(() => {
      let value = _this.join();
      while (condition(value) === true) {
        for (let j = 0, n = fns.length - 1; j < n; ++j) {
          value = fns[j](value);
        }
      }
      return value;
    });
  }
  flatmap(fn) {
    return new this(() => fn(this.join()).join());
  }
}

Monad.lift = (value) => {
  return new Monad(() => value);
}
;

module.exports = {
  Monad: Monad
};











