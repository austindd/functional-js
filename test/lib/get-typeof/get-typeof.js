function getTypeof(x) {
  if (typeof x === "boolean") {
    return "boolean";
  }
  else if (typeof x === "function") {
    return "function";
  }
  else if (typeof x === "string") {
    return "string";
  }
  else if (typeof x === "symbol") {
    return "symbol";
  }
  else if (typeof x === "undefined") {
    return "undefined";
  }
  else if (typeof x === "number") {
    if (isNaN(x)) {
      return "NaN";
    } else {
      return "number";
    }
  }
  else if (typeof x === "object") {
    if (x === null) {
      return "null";
    } else if (Array.isArray(x)) {
      return "array";
    } else {
      return "object";
    }
  }
}

module.exports = { getTypeof: getTypeof }
