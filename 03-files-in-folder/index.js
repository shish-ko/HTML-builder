const path = require("path");
const { stdin, stdout } = process;
const { readdir } = require('node:fs/promises');
const { stat } = require("node:fs");


(async function () {
  const filesArr = await readdir(path.join(__dirname, "secret-folder"));
  for (let file of filesArr) {
    let name = file.split(".").splice(0, 1).join();
    let format = file.split(".").splice(1, 1).join();
    stat(path.join(__dirname, "secret-folder", file), (err, stat) => {
      if (stat.isFile()) {
        stdout.write(name + " . " + format + ' . ' + stat.size + 'kb\n');
      }
    })
  }
})()