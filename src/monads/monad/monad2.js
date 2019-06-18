

class Monad {
  constructor(value) {
    this._value = value;
  }
  join() {
    const that = this;
    return that._value;
  }
  lift(value) {
    return new Monad(value);
  }
  map(fn) {
    const that = this;
    that._value = fn(that.join());
    return that;
  }
  mapWhen(condition, fn) {
    const that = this;
    if (condition(value) === true) {
      that._value = fn(that._value);
      return that;
    }
    else return that;
  }
  mapFor(count, fn) {
    const that = this;
    for (let i = 0; i < count; ++i) {
      that._value = fn(that._value);
    return value;
    };
  }
  mapWhile(condition, fn) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      while (condition(value) === true) {
        value = fn(value);
      }
      return value;
    });
  }
  doWhen(condition, fn) {
    const that = this;
    return new Monad(() => {
      const value = that.join();
      if (condition(value) === true) {
        fn(value); 
      }
      return value;
    });
  }
  doFor(count, fn) {
    const that = this;
    return new Monad(() => {
      const value = that.join();
      for (let i = 0; i < count; ++i) {
        fn(value);
      }
      return value;
    });
  }
  /*  doWhile:: c f => Monad
   *  passes the wrapped value to condition function for while loop
   *  The value will not mutate, so either the condition function or 'do' function
   *  must involve a side effect to produce a halting condition.
   *  Prone to infinite loops. Use with caution.
   */
  doWhile(condition, fn) {
    const that = this;
    return new Monad(() => {
      const value = that.join();
      while (condition(value)) {
        fn(value);
      }
      return value;
    });
  }
  pipe(...fns) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      for (let i = 0, n = fns.length; i < n; ++i) {
        value = fns[i](value);
      }
      return value;
    });
  }
  pipeWhen(condition, ...fns) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      if (condition(value) === true) {
        for (let i = 0, n = fns.length; i < n; ++i) {
          value = fns[i](value);
        }
      }
      return value;
    });
  }
  pipeFor(count, ...fns) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      for (let i = 0; i < count; i++) {
        for (let j = 0, n = fns.length; j < n; ++j) {
          value = fns[j](value);
        }
      }
      return value;
    });
  }
  pipeWhile(condition, ...fns) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      for (let j = 0, n = fns.length; j < n; ++j) {
        if (condition(value) === true) {
          value = fns[j](value);
        }
      }
      return value;
    });
  }
  whilePipe(condition, ...fns) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      while (condition(value) === true) {
        for (let j = 0, n = fns.length; j < n; ++j) {
          value = fns[j](value);
        }
      }
      return value;
    });
  }
  bind(monad) {
    const that = this;
    return new monad(() => that.join());
  }
  trace() {
    const that = this;
    return new Monad(() => {
      let value = that.fn();
      console.dir(value);
      return value;
    });
  }
}
Monad.lift = (value) => {
  return new Monad(value);
};




// ****************************************************************

class MonadLazy {
  constructor(fn) {
    this.fn = fn;
  }
  join() {
    const that = this;
    return that.fn();
  }
  lift(value) {
    return new Monad(() => value);
  }
  map(fn) {
    const that = this;
    return new Monad(() => fn(that.join()));
  }
  mapWhen(condition, fn) {
    const that = this;
    return new Monad(() => {
      const value = that.join();
      if (condition(value) === true) {
        return fn(value); 
      }
      else return value;
    });
  }
  mapFor(count, fn) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      for (let i = 0; i < count; ++i) {
        value = fn(value);
      }
      return value;
    });
  }
  mapWhile(condition, fn) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      while (condition(value) === true) {
        value = fn(value);
      }
      return value;
    });
  }
  doWhen(condition, fn) {
    const that = this;
    return new Monad(() => {
      const value = that.join();
      if (condition(value) === true) {
        fn(value); 
      }
      return value;
    });
  }
  doFor(count, fn) {
    const that = this;
    return new Monad(() => {
      const value = that.join();
      for (let i = 0; i < count; ++i) {
        fn(value);
      }
      return value;
    });
  }
  /*  doWhile:: c f => Monad
   *  passes the wrapped value to condition function for while loop
   *  The value will not mutate, so either the condition function or 'do' function
   *  must involve a side effect to produce a halting condition.
   *  Prone to infinite loops. Use with caution.
   */
  doWhile(condition, fn) {
    const that = this;
    return new Monad(() => {
      const value = that.join();
      while (condition(value)) {
        fn(value);
      }
      return value;
    });
  }
  pipe(...fns) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      for (let i = 0, n = fns.length; i < n; ++i) {
        value = fns[i](value);
      }
      return value;
    });
  }
  pipeWhen(condition, ...fns) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      if (condition(value) === true) {
        for (let i = 0, n = fns.length; i < n; ++i) {
          value = fns[i](value);
        }
      }
      return value;
    });
  }
  pipeFor(count, ...fns) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      for (let i = 0; i < count; i++) {
        for (let j = 0, n = fns.length; j < n; ++j) {
          value = fns[j](value);
        }
      }
      return value;
    });
  }
  pipeWhile(condition, ...fns) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      for (let j = 0, n = fns.length; j < n; ++j) {
        if (condition(value) === true) {
          value = fns[j](value);
        }
      }
      return value;
    });
  }
  whilePipe(condition, ...fns) {
    const that = this;
    return new Monad(() => {
      let value = that.join();
      while (condition(value) === true) {
        for (let j = 0, n = fns.length; j < n; ++j) {
          value = fns[j](value);
        }
      }
      return value;
    });
  }
  bind(monad) {
    const that = this;
    return new monad(() => that.join());
  }
  trace() {
    const that = this;
    return new Monad(() => {
      let value = that.fn();
      console.dir(value);
      return value;
    });
  }
}

MonadLazy.lift = (value) => {
  return new Monad(() => value);
};




module.exports = {
  Monad: Monad,
  MonadLazy: MonadLazy
};



