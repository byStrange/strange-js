const fs = require("fs");
const { root } = require("./utils.js");
const readFile = function (filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (e) {
    throw new Error(e);
  }
};

const createFolder = function (folderName, _default = true, blank = true) {
  if (_default) folderName = root + folderName;
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    } else {
      if (!blank) {
        fs.mkdirSync(folderName + " - (1)");
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const deleteFolder = function (folderName, _default = true) {
  if (_default) folderName = root + folderName;
  try {
    if (fs.existsSync(folderName)) fs.rmdirSync(folderName);
    else console.log('Folder does not exist');
  } catch (err) {
    console.error("\x1b[31m%s\x1b[0m", err);
  }
};

const writeFile = function (filePath, content, _default = true) {
  if (_default) filePath = root + filePath;
  try {
    fs.writeFileSync(filePath, content);
  } catch (err) {
    console.error("\x1b[31m%s\x1b[0m", err);
  }
};

module.exports = {
  readFile,
  createFolder,
  deleteFolder,
  writeFile
};