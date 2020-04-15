const pathModules = "./node_modules/";
const fs = require('fs');

let packageList = [];

try {

  const modules = fs.readdirSync(pathModules);

  modules.forEach((folder) => {

    let license;
    let packageContent;
  
    const folderFiles = fs.readdirSync(pathModules + folder + "/");
  
    if (fs.existsSync(pathModules + folder + "/LICENSE")) {
      license = fs.readFileSync(pathModules + folder + "/LICENSE", "utf8")
    }
    
    if (fs.existsSync(pathModules + folder + "/package.json")) {
      packageContent = fs.readFileSync(pathModules + folder + "/package.json", "utf8")
    }

    if(packageContent !== undefined){
      packageContent = JSON.parse(packageContent)
    } else {
      packageContent = {}
    }
  
    packageList.push({ folder, folderFiles, license, packageContent });

  });

} catch (err) {
  console.log(err);
}

fs.writeFile("dependencies.json", JSON.stringify(packageList), "utf8", data => {
  console.log("ok")
});

