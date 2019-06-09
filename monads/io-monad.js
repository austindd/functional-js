const Monad = require("./monad.js");

export class IO extends Monad {
  constructor() {
    this.fn = fn;
  }
  run() {
    return this.fn();
  }
  map(fn) {
    return new this(() => fn(this.run()));
  }
  bind(monad) {
    return new monad(() => fn(this.run()).run());
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
