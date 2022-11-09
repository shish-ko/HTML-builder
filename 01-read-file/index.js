const process = require("process");
const fs = require("fs");
const { stdout } = process;
const path = require("path");
// eslint-disable-next-line
const readableStream=fs.createReadStream(path.join(__dirname, "text.txt"));
readableStream.on("data", chunk=>stdout.write(chunk));

