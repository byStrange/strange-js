#!/usr/bin/env node
var document, result, head, styleScoped = [], originalHTML, window;
const utils = require("./utils.js");
const yargs = require("yargs");
const { writeFile, readFile, createFolder, deleteFolder } = require("./functions.js");

function __init__() {
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  window = new JSDOM(readFile(options.path)).window;
  document = window.document;
  originalHTML = document.documentElement.innerHTML;
  head = document.head;
}

function main() {
  __init__();
  compile();
  result = `<!DOCTYPE html>
  <html lang="en">
  ${document.documentElement.innerHTML}
  </html>`;
  write();
}

function compile() {
  utils.propToClass(document);
  utils.propToStyle(document);
  utils.propToCss(document);
  utils.propToMedia(document, styleScoped);
  var styles = [...styleScoped];
  var styleHTML = `    <style>${styles.join("\n")}</style>\n`;
  head.insertAdjacentHTML("beforeend", styleHTML);
}

function write() {
  var fileName = options.path.split("/").pop().split(".")[0];
  if (utils.option.output) {
    try {
      createFolder(utils.option.output);
      writeFile(utils.option.output + '/' + fileName + '.html', result);
      // with green colors
      console.log("\x1b[32m%s\x1b[0m", "Successfully compiled " + '.'+utils.option.output + '/' + fileName + ".html");
    }
    catch (err) {
      console.error("\x1b[31m%s\x1b[0m", err);
    }
  }
  else {
    try {
      writeFile(options.path, result);
      console.log("\x1b[32m%s\x1b[0m", "Successfully compiled to " + options.path);
    }
    catch (err) {
      console.error("\x1b[31m%s\x1b[0m", err);
    }
  }
}

const options = yargs.usage("Usage: -o <path>").option("o", {
  alias: "path",
  describe: "type file path",
  type: "string",
  demandOption: true,
}).version(utils.version).argv

if (options.path) {
  main();
}