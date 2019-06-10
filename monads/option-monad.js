const Monad = require("./monad.js");

export const isNone = (value) => {
    if (value === undefined
      || value === null
      || value === NaN
    ) {
      return true;
    } else return false;
};

export const isSome = () => {
    if (value === undefined
      || value === null
      || value === NaN
    ) {
      return false;
    } else return true;
    
};

export class Option extends Monad {
  constructor(fn) {
    this.fn = fn;
  }
  join() {
    const value = this.fn();
    if (isSome(value)) {
      return value;
    } else {
      return undefined;
    }
  }
  map(fn) {
    const _this = this;
    return new Option(() => {
      const value = _this.join();
      if (isSome(value)) {
        return fn(value);
      } else {
        return undefined;
      }
    });
  }
  mapWithDefault(fn, defaultFn) {
    const _this = this;
    return new Option(() => {
      const value = _this.join();
      if (isSome(value)) {
        return fn(value);
      } else {
        return defaultFn();
      }
    });
  }
  flatmap(fn) {
    const _this = this;
    return new Option(() => {
      const value = _this.join();
      if (isSome(value)) {
        return fn(value).join();
      } else {
        return undefined;
      }
    });
  }
  flatmapWithDefault(fn, defaultFn) {
    const _this = this;
    return new Option(() => {
      const value = _this.join();
      if (isSome(value)) {
        return fn(value).join();
      } else {
        return defaultFn;
      }
    });
  }
}

