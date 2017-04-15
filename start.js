
const child_process = require('child_process');

let nodefile=["./chips.js"];
//setup + start
function start() {
  console.log('Master process is running.');
  var proc = child_process.spawn('node', nodefile);
  proc.stdout.on('data', function (data) {
    console.log(data.toString());
  });
  proc.stderr.on('data', function (data) {
    console.log(data.toString());
  });

  proc.on('exit', function (code) {
    console.log('child process exited with code ' + code);
    delete(proc);
    setTimeout(start(), 5000);
  });
}
start();
