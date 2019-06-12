
function typeMatch(types = [] || "", item) {
  let itemType = typeof item;
  if (itemType === "object") {
    if (Array.isArray(item)) {
      itemType = "array";
    } else if (itemType === null) {
      itemType = "null";
    }
  } else if (itemType === "number") {
    if(isNaN(item)) {
      itemType = "NaN"; 
    }
  }

  if (Array.isArray(types)) {
    return types.includes(itemType);
  } else if (typeof types === "string") {
    return types === itemType;
  } else return new TypeError("Invalid argument type for 'types'");
}

class IfTypeof {
  constructor(fn) {
    this.fn = fn;
    this.types = undefined;
    this.booleanFlag = true;
  }
  run() {
    return this.fn();
  }
  is(types = [] || "") {
    const that = this;
    const result = new IfTypeof(that.fn);
    result.types = types;
    return result;
  }
  then(fn) {
    const that = this;
    const _fn = () => {
      const value = that.fn();
      if(typeMatch(that.types, value) === that.booleanFlag) {
        return fn(value);
      } else { return value; }
    };
    const result = new IfTypeof(_fn);
    result.types = that.types;
    result.booleanFlag = that.booleanFlag;
    return result;
  }
  else() {
    const that = this;
    that.booleanFlag === false;
    const _fn = () => {
      const value = that.fn();
      if(typeMatch(that.types, value) === that.booleanFlag) {
        return fn(value);
      } else { return value; }
    };
    const result = new IfTypeof(_fn);
    result.types = that.types;
    result.booleanFlag = that.booleanFlag;
    return result;
  }
  traceImmediate() {
    const that = this;
    const value = that.fn();
    console.dir(value);
    const result = new IfTypeof(() => value);
    result.types = that.types;
    result.booleanFlag = that.booleanFlag;
    return result;
  }
  trace() {
    const that = this;
    const result = new IfTypeof(() => {
      const value = that.fn();
      console.dir(value);
      return value;
    });
    result.types = that.types;
    result.booleanFlag = that.booleanFlag;
    return result;
  }
}

const ifTypeof = (value) => new IfTypeof(() => value);

const test = ifTypeOf(1).is(["string", "number"])
  .then(x =>  x + 1) 
  .then(x => {
    return x * 5;
  })

const test2 = ifTypeof({}).is(["number", "array", "object"])
  .then(x => {
    x.name = "Jay-Z"
    return x;
  })
  .then(() => undefined)
  .is(["undefined"])
  .then(x => {console.log("It's undefined now!"); return false;})
  .traceLazy()
  .then(() => {})
  .is("boolean")
  .then(() => {console.log("End"); return 0 })



console.dir(test.run());

setTimeout(() => {
  console.dir(test2.run());
}, 100)




