class Universe {
  constructor() {
    this.Monad = class Monad {};
    this.IO = class IO extends Monad {};
    this.Option = class Option extends Monad {};
    this.Some = class Some extends Option {};
    this.None = class None extends Option {};
    this.Fetch = class Fetch extends Monad {};
  }
}
