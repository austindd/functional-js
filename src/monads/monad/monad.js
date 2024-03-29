
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
    const value = that.join();
    that._value = fn(value);
    return that;
  }
  mapWhen(condition, fn) {
    const that = this;
    const value = that.join();
    if (condition(value) === true) {
      that._value = fn(value);
    }
    return that;
  }
  mapFor(count, fn) {
    const that = this;
    let value = that.join();
    for (let i = 0; i < count; ++i) {
      value = fn(value);
    };
    that._value = value;
    return that;
  }
  mapWhile(condition, fn) {
    const that = this;
    let value = that.join();
    while (condition(value) === true) {
      value = fn(value);
    }
    that._value = value;
    return that;
  }
  doWhen(condition, fn) {
    const that = this;
    const value = that.join();
    if (condition(value) === true) {
      fn(value); /* Note: 'that._value' is not altered by this method */
    }
    return that;
  }
  doFor(count, fn) {
    const that = this;
    const value = that.join();
    for (let i = 0; i < count; ++i) {
      fn(value);
    }
    return that;
  }
  /*  doWhile:: c f => Monad
   *  passes the wrapped value to condition function for while loop
   *  The value will not mutate, so either the condition function or 'do' function
   *  must involve a side effect to produce a halting condition.
   *  Prone to infinite loops. Use with caution.
   */
  doWhile(condition, fn) {
    const that = this;
    const value = that.join();
    while (condition(value)) {
      fn(value);
    }
    return that;
  }
  pipe(...fns) {
    const that = this;
    let value = that.join();
    for (let i = 0, n = fns.length; i < n; ++i) {
      value = fns[i](value);
    }
    that._value = value;
    return that;
  }
  pipeWhen(condition, ...fns) {
    const that = this;
    let value = that.join();
    if (condition(value) === true) {
      for (let i = 0, n = fns.length; i < n; ++i) {
        value = fns[i](value);
      }
    }
    that._value = value;
    return that;
  }
  pipeFor(count, ...fns) {
    const that = this;
    let value = that.join();
    for (let i = 0; i < count; i++) {
      for (let j = 0, n = fns.length; j < n; ++j) {
        value = fns[j](value);
      }
    }
    that._value = value;
    return that;
  }
  pipeWhile(condition, ...fns) {
    const that = this;
    let value = that.join();
    for (let j = 0, n = fns.length; j < n; ++j) {
      if (condition(value) === true) {
        value = fns[j](value);
      }
    }
    that._value = value;
    return that;
  }
  whilePipe(condition, ...fns) {
    const that = this;
    let value = that.join();
    while (condition(value) === true) {
      for (let j = 0, n = fns.length; j < n; ++j) {
        value = fns[j](value);
      }
    }
    that._value = value;
    return that;
  }
  bind(monad) {
    const that = this;
    const value = that.join()
    return monad.lift(value);
  }
  trace() {
    const that = this;
    let value = that.join();
    console.dir(value);
    return that;
  }
}
Monad.lift = (value) => {
  return new Monad(value);
};




// ****************************************************************

class LazyMonad {
  constructor(fn) {
    this.fn = fn;
  }
  join() {
    const that = this;
    return that.fn();
  }
  lift(value) {
    return new LazyMonad(() => value);
  }
  map(fn) {
    const that = this;
    return new LazyMonad(() => fn(that.join()));
  }
  mapWhen(condition, fn) {
    const that = this;
    return new LazyMonad(() => {
      const value = that.join();
      if (condition(value) === true) {
        return fn(value); 
      }
      else return value;
    });
  }
  mapFor(count, fn) {
    const that = this;
    return new LazyMonad(() => {
      let value = that.join();
      for (let i = 0; i < count; ++i) {
        value = fn(value);
      }
      return value;
    });
  }
  mapWhile(condition, fn) {
    const that = this;
    return new LazyMonad(() => {
      let value = that.join();
      while (condition(value) === true) {
        value = fn(value);
      }
      return value;
    });
  }
  doWhen(condition, fn) {
    const that = this;
    return new LazyMonad(() => {
      const value = that.join();
      if (condition(value) === true) {
        fn(value); 
      }
      return value;
    });
  }
  doFor(count, fn) {
    const that = this;
    return new LazyMonad(() => {
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
    return new LazyMonad(() => {
      const value = that.join();
      while (condition(value)) {
        fn(value);
      }
      return value;
    });
  }
  pipe(...fns) {
    const that = this;
    return new LazyMonad(() => {
      let value = that.join();
      for (let i = 0, n = fns.length; i < n; ++i) {
        value = fns[i](value);
      }
      return value;
    });
  }
  pipeWhen(condition, ...fns) {
    const that = this;
    return new LazyMonad(() => {
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
    return new LazyMonad(() => {
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
    return new LazyMonad(() => {
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
    return new LazyMonad(() => {
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
    return monad.lift(that.join());

    // Because some monads are eagerly evaluated (and do not expect
    // to lift a "deferred" value (e.g. '() => value'), it is
    // necessary to call 'join()' and execute all deferred operations
    // before lifting the value to the foreign monad.
    //
    // Perhaps there is another way to either (1) defer evaluation of
    // lazy monads, or (2) lift values with a known evaluation preference.
    
  }
  trace() {
    const that = this;
    return new LazyMonad(() => {
      let value = that.fn();
      console.dir(value);
      return value;
    });
  }
}

LazyMonad.lift = (value) => {
  return new LazyMonad(() => value);
};




module.exports = {
  Monad: Monad,
  LazyMonad: LazyMonad
};



