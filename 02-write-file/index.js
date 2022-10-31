const process = require("process");
const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");

fs.access(path.join(__dirname, "text.txt"), (err) => {
  if (err) {
    return mkFolder();
  }
  stdout.write(".txt file exists. Write your logs: \n")
})
const input = fs.createWriteStream(path.join(__dirname, "text.txt"));
stdin.on("data", (chunk) => {
  if (chunk.toString().trim() == "exit") {
    process.exit();
  }
  input.write(chunk);
})


function mkFolder() {
  fs.writeFile(
    path.join(__dirname, 'text.txt'), "",
    (err) => {
      if (err) throw err;
      stdout.write(".txt file is created. Write your logs: \n")
    }
  );
}
process.on('SIGINT', function() {
  process.exit();
});




process.on("exit", () => stdout.write(`Your log file saved as ${path.join(__dirname, "text.txt")}\n`));