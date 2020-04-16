const fs = require('fs');
const { program } = require('commander');

program.on('--help', () => {
  console.log('');
  console.log('Example call:');
  console.log('  $ index.js --help');
});

program
  .requiredOption('-s, --node-module <path>', 'defines the path to the node_module folder')
  .option('-d, --destination <path>', 'defines the file to output the result')

program.parse(process.argv);

let packageList = [];

try {

  const pathModules = program.nodeModule;
  const modules = fs.readdirSync(pathModules);

  modules.forEach((folder) => {

    let license;
    let packageContent;
    let filteredPackage;

    if (fs.lstatSync(pathModules + folder).isDirectory()) {

      if (fs.existsSync(pathModules + folder + "/LICENSE")) {
        license = fs.readFileSync(pathModules + folder + "/LICENSE", "utf8")
      }

      if (fs.existsSync(pathModules + folder + "/package.json")) {
        packageContent = fs.readFileSync(pathModules + folder + "/package.json", "utf8")
      }

      if (packageContent !== undefined) {
        packageContent = JSON.parse(packageContent)
        filteredPackage = {
          "name": packageContent.name,
          "version": packageContent.version,
          "description": packageContent.description,
          "author": packageContent.author,
        };
      } else {

        filteredPackage = {}
      }

      packageList.push({ folder, license, filteredPackage });

    }

  });

} catch (err) {
  console.log(err);
}

let resultFile = program.destination || "depencencies.json"

fs.writeFile(resultFile, JSON.stringify(packageList), "utf8", data => {
  console.log("ok")
});

