const { stdin, stdout } = process;
const path = require("path");
const { mkdir, readdir, copyFile, readFile, stat } = require("node:fs/promises");
const fs = require("fs");

const targetDir = path.join(__dirname, "project-dist");
let temporaryMemory = "";

async function buildProject () {
  await mkdir(targetDir, { recursive: true }).then(stdout.write(`${path.sep}project-dist is ready \n`));
  await copyAssets(path.join(__dirname, "assets")).then(stdout.write("All assets are copied \n"));
  await blockChange().then(stdout.write("Template is collected\n"));
  await createIndex().then(stdout.write("Index.html is ready \n"));
  await cssBundler().then(stdout.write("CSS bundle is ready \n"));
  stdout.write(`Project is collected at ${targetDir} \n`);
}
buildProject();
// const templateParsing = fs.createReadStream(path.join(__dirname, "template.html"));
//  readFile(path.join(__dirname, "template.html"), "utf-8").then()
// templateParsing.on('data', chunk => temporaryMemory += chunk);
// templateParsing.on('close', blockChange);
async function blockChange() {
  temporaryMemory = await readFile(path.join(__dirname, "template.html"), "utf-8");
  const blocks = await readdir(path.join(__dirname, "components"));
  for (let block of blocks) {
    const name = path.basename(block, ".html");
    if (temporaryMemory.includes(`{{${name}}}`)) {
      const blockToInsert = await readFile(path.join(__dirname, "components", block));
      temporaryMemory = temporaryMemory.replace(`{{${name}}}`, blockToInsert);
    }
  }
  
}
async function createIndex() {
  const writeStream = fs.createWriteStream(path.join(targetDir, "index.html"));
  writeStream.write(temporaryMemory);
}
function promise(path) {
  return new Promise(async (res, rej) => {
    const arr = await readFile(path);
    res(arr);
  });
}
async function copyAssets(dir) {
  const statData = await stat(dir);
  if (statData.isDirectory()) {
    const assetsFiles = await readdir(dir);
    for (let file of assetsFiles) {
      await copyAssets(path.join(dir, file));
    }
  } else {
    let currentFile=dir.replace(__dirname, "").split(path.sep);
    let newDir=currentFile.slice();
    newDir.pop();
    newDir=newDir.join(path.sep);
    await mkdir(`${targetDir}${newDir}`, {recursive: true});
    await copyFile(dir, path.join(targetDir, `${currentFile.join(path.sep)}`));
  }
}
async function cssBundler(){
  const writeStream=fs.createWriteStream(path.join(targetDir, "style.css"));
  const cssFiles= await readdir(path.join(__dirname, "styles"));
  for(let file of cssFiles){
    const readStream=fs.createReadStream(path.join(__dirname, "styles", file));
    readStream.on("data", chunk=>writeStream.write(chunk));
  }
  writeStream.on("close", ()=> stdout.write("CSS bundle is ready"));
}

