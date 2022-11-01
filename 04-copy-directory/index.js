const { mkdir, rm, access, readdir, copyFile } = require("fs/promises");
const path = require("path");
const fs = require('fs');
const { stdin, stdout } = process;

const dirName = path.join(__dirname, "files-copy")
const check = new Promise(async function (resolve, reject) {
  await access(dirName).then(async resolved => {
    await rm(dirName, { recursive: true }).then((res) => { stdout.write('Target directory removed\n') }, (rej) => { console.log("Error: "); process.exit() });
    await mkdir(path.join(__dirname, "files-copy")).then(stdout.write('Target directory created\n'));
    resolve()
  }, async reject => {
    await mkdir(path.join(__dirname, "files-copy")).then(stdout.write('Target directory created\n'));
    resolve()
  })
})
// при создании промиса выполняется код внутри, поэтому можно сразу обработать .then(res => { foo() }), если надо отложить на потом то надо создать ф-цию которая вернет промис.

async function foo(){
  const filesToRemove=await readdir(path.join(__dirname, "files"));
  for(let file of filesToRemove){
   await copyFile(path.join(__dirname, "files", file), path.join(dirName, file))
  }
  stdout.write(`All files copied to: ${dirName} \n`)
}
check.then(res => { foo() })

// async function qwe () {
//   await access(dirName).then(async resolved => {
//     await rm(dirName, { recursive: true }).then((res) => { stdout.write('Target directory removed\n') }, (rej) => { console.log("Error: "); process.exit() });
//     await mkdir(path.join(__dirname, "files-copy")).then(stdout.write('Target directory created\n'));
//   }, async reject => {
//     await mkdir(path.join(__dirname, "files-copy")).then(stdout.write('Target directory created\n'));
    
//   })
// }
// qwe().then(res => { foo() })

