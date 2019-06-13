const { getTypeof } = require("../get-typeof/get-typeof");

function runTest(testFunction, options = {name: null, testID: null}) {
  const output = {};
  if (!!options.testID) {
    output.testID = options.testID
  }

  // if the input is not a function, we won't try to call it.
  // We will just return a message in the results to indicate
  // what it was.

  let dataType = getTypeof(testFunction);
  if (dataType !== "function") {
    output.name = options.name ? options.name : "[" + dataType.toUpperCase() + "]";
    output.result = "NOT A FUNCTION";
  } else if (dataType === "function") {
    output.name = options.name ? options.name : testFunction.name;
    try {
      output.result = testFunction();
    }
    catch (err) {
      output.result = "ERROR IN TEST"
      console.error("Error: invalid test at: '" + output.name + "'");
      console.error(err);
    }
    return output;
  } 
};

module.exports.runTest = runTest;
