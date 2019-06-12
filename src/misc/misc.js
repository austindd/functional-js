const exports = module.exports;

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
exports.getTypeof = getTypeof;

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
exports.typeMatch = typeMatch;


function objectToArray(obj) {
  Object.keys(obj).map((key) => {
    return obj[key];
  });
}
