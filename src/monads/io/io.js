const Monad = require("./monad.js");

export class IO extends Monad {
  constructor() {
    this.fn = fn;
  }
  join() {
    return this.fn();
  }
  map(fn) {
    return new this(() => fn(this.join()));
  }
  flatmap(fn) {
    return new this(() => fn(this.join()).join());
  }
  lift(value) {
    return new this(() => value);
  }
}

export const ioLog = function(message) {
  return new IO(() => console.log(message));
};
export const ioPure = function(value) {
  return new IO(() => value);
};
export const ioPrompt = function(question) {
  return new IO(() => prompt(question));
};
export default IO;
