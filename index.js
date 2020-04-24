const fs = require('fs');
const { program } = require('commander');
const chalk = require('chalk');

program.on('--help', () => {
  console.log('');
  console.log('Example call:');
  console.log('  $ index.js --help');
});

program
  .requiredOption('-s, --path-package <path>', '')
  .option('-d, --output <output>', '')

program.parse(process.argv);

let result = [];

try {

  let packagePath = program.pathPackage;
  let packageJson = "";

  // Check if exists and opens the file
  if (fs.existsSync(packagePath + "/package.json")) {
    content = fs.readFileSync(packagePath + "/package.json", "utf8")
  }

  if (content !== undefined) {
    content = JSON.parse(content);
    Object.keys(content.dependencies).forEach(dependence => {

      // Checks and open the dependencie folder in node_module.
      if (fs.lstatSync(packagePath + "node_modules/" + dependence).isDirectory()) {

        let license;

        // Check if the files LICENSE exists and stores it.
        if (fs.existsSync(packagePath + "node_modules/" + dependence + "/" + "LICENSE")) {
          license = fs.readFileSync(packagePath + "node_modules/" + dependence + "/LICENSE", "utf8")
        } else {
          // License file not found
        }

        // Check if the files package.json exists and stores it.
        if (fs.existsSync(packagePath + "node_modules/" + dependence + "/" + "package.json")) {
          packageContent = fs.readFileSync(packagePath + "node_modules/" + dependence + "/package.json", "utf8")

          packageContent = JSON.parse(packageContent);

          packageJson = {
            "name": packageContent.name,
            "license": packageContent.license !== undefined ? packageContent.license : ""
          };

          result.push({ packageJson, license });

        } else {
          // package.json not found
        }


      } else {
        // Node folder not found
      }

    });
  } else {
    // arquivo package.json não foi encontrado
  }

} catch (err) {
  console.log(err);
}

let output = program.output || "output.json"

let fd = fs.openSync("./" + output, "w+");
let resultOutput = fs.writeSync(fd, JSON.stringify(result, null, 2), 0, "utf8");

console.log(chalk.green('Completed!'));
console.log(chalk.green('File size:', resultOutput));;

