const fs = require("fs");
const { stdout } = process;
const readableStream=fs.createReadStream(`${__dirname}/text.txt`);
readableStream.on("data", chunk=>stdout.write(chunk));

