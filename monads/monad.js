export class Monad {
  constructor() {
    this.fn = fn;
  }
  run() {
    return this.fn();
  }
  map(fn) {
    return new this(() => fn(this.run()));
  }
  bind(otherMonad) {
    return new otherMonad(() => fn(this.run()).run());
  }
  lift(value) {
    return new this(() => value);
  }
}

export default Monad;
