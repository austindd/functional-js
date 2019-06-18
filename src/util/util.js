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

function objectToArray(obj) {
  Object.keys(obj).map((key) => {
    return obj[key];
  });
}

function arrayToObject(arr, keys /*: array ["foo", "bar"] || object: { 0: "foo", 1: "bar" } */) {
  if (keys) {
    if (typeof keys !== "object") { /* guard type errors for 'keys' param */
      throw new TypeError("Parameter 'keys' must be of type 'object' or 'array'");
    }
    else {
      /* 'keys' param should be a map from index # to string value,
       * so this algorithm can work with both objects and arrays. */
      return arr.reduce((obj, item, index) => {
        obj[keys[index]] = item;
        return obj;
      }, {});
    }
  } else {
    return arr.reduce((obj, item, index) => {
      obj[index] = item;
      return obj;
    }, {});
  }
}

function consoleLog(x) {
  console.log(x);
  return x;
};

function consoleDir(x) {
  console.dir(x);
  return x;
}

function consoleTable(x) {
  console.table(x);
  return x;
}

function consoleWarn(x) {
  console.warn(x);
  return x;
}

function consoleError(x) {
  console.error(x);
  return x;
}


module.exports = {
  getTypeof: getTypeof,
  typeMatch: typeMatch, 
  objectToArray: objectToArray,
  arrayToObject: arrayToObject,
  consoleLog: consoleLog,
  consoleDir: consoleDir,
  consoleTable: consoleTable,
  consoleWarn: consoleWarn,
  consoleError: consoleError
}

