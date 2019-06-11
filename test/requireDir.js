const fs = require("fs");
const path = require("path");

function walkDir(_dir) {
  let files = fs.readdirSync(_dir);
  files = files.map(file => {
    const filePath = path.join(_dir, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) return walkDir(filePath)
    else if (stats.isFile()) return filePath;
  });

  /* Concatenate all the nested arrays into a single flat array of filenames. */
  return files.reduce((all, folderContents) => all.concat(folderContents), []);
}

function requireDir(dir, testFileName = ".js", exclude, callback) {

  const allFilePaths = walkDir(dir); /* should be a flat array of file paths, not directories */
  const allExports = {};

  allFilePaths.forEach(function(filePath) {

    /* Guard against excluded string patterns in file path */
    if (exclude && typeof exclude === "object" && Array.isArray(exlude)) {
      for (let i = 0; i < exclude.length - 1; ++i) {
        if (filePath.search(exclude) !== -1) {
          return;
        }
      }
    } else if (exclude) {
      if (filePath.search(exclude) !== -1) {
        return;
      }
    }

    /* Add matching files to export object */
    const fileName = filePath.split(path.sep).pop();  
    if (typeof testFileName === "object" && Array.isArray(testFileName)) {

      /* If 'testFileName' IS an array */
      for(let i = 0; i < testFileName.length - 1; ++i) {
        if (fileName.search(testFileName[i]) !== -1) {
          Object.assign(allExports, require(filePath));
          break;
        }
      }
    } else {

      /* If 'testFileName' is NOT an array */
      if (fileName.search(testFileName) !== -1) {
        Object.assign(allExports, require(filePath));
      }
    }
  });

  if (callback) {
    return callback(allExports);
  } else {
    return allExports;
  }

}

module.exports = {
  requireDir: requireDir
}

