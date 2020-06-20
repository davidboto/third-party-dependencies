#! /usr/bin/env node

const fs = require('fs');
const { program } = require('commander');
const chalk = require('chalk');

program.on('--help', () => {
  console.log('');
  console.log('Example call:');
  console.log('  $ index.js --help');
});

program
  .requiredOption('-p, --package-path <path>', 'path to package.json')
  .option('-o, --output <output>', 'filename to output the result')
  .option('-d, --include-dev-dependencies', 'include devDependencies')
  .option('-i, --ignore <packages>', 'package names separated by commas (e.g., packageA,packageB,packageC)')
  // .option('-f, --fields <fields>, fields from package.json that should be extracted separated by commas (e.g., name,license,description)');

program.parse(process.argv);
const { output, packagePath, includeDevDependencies, ignore, fields } = program;
const fileEnconding = "utf8"

const dependenceExtractor = (path) => {
  let result = [];
  if (fs.existsSync(path)) {
    content = fs.readFileSync(path, fileEnconding)
    content = JSON.parse(content);

    Object.keys(content.dependencies).forEach(dependenceName => result.push(dependenceName));
    if (includeDevDependencies)
      Object.keys(content.devDependencies).forEach(dependenceName => result.push(dependenceName));

  }
  return result;
}

const licenseExtractor = (path) => {
  let license = "";
  if (fs.existsSync(path)) {
    license = fs.readFileSync(path, fileEnconding)
  }
  return license;
}

const packageExtractor = (path) => {
  let result;
  if (fs.existsSync(path)) {
    content = fs.readFileSync(path, fileEnconding)
    content = JSON.parse(content);

    result = {
      "name": content.name,
      "license": content.license !== undefined ? content.license : ""
    };

  }
  return result;
}

const ignoreDependencies = (dependenceList, ignore) => {
  let dependencesToIgnore = ignore.split(",");
  let result = dependenceList.filter(d => !dependencesToIgnore.includes(d))
  return result;
}

const containsLicense = (dependence) => {
  if (dependence.package.license === "" && dependence.license === "") {
    return false;
  }
  return true;
}

let result = [];
let resultNoLicense = [];

try {
  let dependencePath = packagePath + "/package.json";
  let dependenceList = dependenceExtractor(dependencePath);

  if (ignore) {
    dependenceList = ignoreDependencies(dependenceList, ignore);
  }

  dependenceList.forEach((name) => {
    let licensePath = packagePath + "node_modules/" + name + "/" + "LICENSE"
    let license = licenseExtractor(licensePath);

    let packagejsonPath = packagePath + "node_modules/" + name + "/" + "package.json"
    let package = packageExtractor(packagejsonPath);

    let dependence = { package, license }

    if(!containsLicense(dependence)){
      resultNoLicense.push( dependence.package.name )  
    };
    result.push({ package, license })

  });

} catch (err) {
  console.log(err);
}

let filename = output || "output.json";
let fd = fs.openSync("./" + filename, "w+");
let parsedResult = JSON.stringify(result, null, 2);
let resultOutput = fs.writeSync(fd, parsedResult, 0, fileEnconding);

if(resultNoLicense.length > 0) {
  console.log(chalk.red("No license FOUND for the given package(s):", resultNoLicense));
}

console.log(chalk.green("Number of dependencies:", Object.keys(result).length));
console.log(chalk.green("Output in: " + filename + " (" + + resultOutput + " bytes" + ")"));
