const process = require("process");
const fs = require("fs");
const { stdout } = process;
// eslint-disable-next-line
const readableStream=fs.createReadStream(`${__dirname}/text.txt`);
readableStream.on("data", chunk=>stdout.write(chunk));

