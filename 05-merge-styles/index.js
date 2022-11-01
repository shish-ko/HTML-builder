const path=require ("path");
const {stdout}=process;
const {readdir}=require ("fs/promises");
const {stat}=require ("fs/promises");
const fs = require("fs")

const stylesDir=path.join(__dirname, "styles");
const targetDir=path.join(__dirname, "project-dist");
(async function (){
  const folderFiles= await readdir(stylesDir);
  console.log(folderFiles)
  const writingStream=fs.createWriteStream(path.join(targetDir, "bundle.css"));
  for(let file of folderFiles){
    const fileStats=await stat(path.join(stylesDir, file));
    if(fileStats.isFile() && path.extname(file)===".css"){
      const readigStream=fs.createReadStream(path.join(stylesDir, file));
      readigStream.on("data", chunk=>writingStream.write(chunk))
    }
  }
})()