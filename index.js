const fs = require('fs');
const { program } = require('commander');
const chalk = require('chalk');

program.on('--help', () => {
  console.log('');
  console.log('Example call:');
  console.log('  $ index.js --help');
});

program
  .requiredOption('-s, --path-package <path>', 'path to package.json')
  .option('-o, --output <output>', 'file name to output the result')

program.parse(process.argv);

let result = [];

const dependenceExtractor = (content) => {
  let dependenceList = [];
  Object.keys(content.dependencies).forEach(dependenceName => dependenceList.push(dependenceName));
  return dependenceList;
}

// Check if the files LICENSE exists and stores it.
const licenseExtractor = (path) => {
  let license = "";
  if (fs.existsSync(path)) {
    license = fs.readFileSync(path, "utf8")
  }
  return license;
}

// Checks if the files package.json exists and stores it;
const packageJsonExtractor = (path) => {
  let packageJson;
  if (fs.existsSync(path)) {
    packageContent = fs.readFileSync(path, "utf8")
    packageContent = JSON.parse(packageContent);
    packageJson = {
      "name": packageContent.name,
      "license": packageContent.license !== undefined ? packageContent.license : ""
    };
  }
  return packageJson;
}
try {

  let packagePath = program.pathPackage;

  // Check if package.json and read it content.
  if (fs.existsSync(packagePath + "/package.json")) {
    content = fs.readFileSync(packagePath + "/package.json", "utf8")
  } else {
    console.log(chalk.red('package.json not found.'));
    return;
  }

  let dependenceList = dependenceExtractor(JSON.parse(content));

  dependenceList.forEach((name) => {
    let licensePath = packagePath + "node_modules/" + name + "/" + "LICENSE"
    let packagejsonPath = packagePath + "node_modules/" + name + "/" + "package.json"
    let license = licenseExtractor(licensePath);
    let packageJson = packageJsonExtractor(packagejsonPath);
    result.push({ packageJson, license })
  });

} catch (err) {
  console.log(err);
}

let output = program.output || "output.json"
let fd = fs.openSync("./" + output, "w+");
let parsedResult = JSON.stringify(result, null, 2);

let resultOutput = fs.writeSync(fd, parsedResult, 0, "utf8");

console.log(chalk.green('Completed!'));
console.log(chalk.green('File size:', resultOutput));