const exec = require("child_process").exec;
function execute(command) {
  return new Promise((resolve) => {
    exec(command, async (err, stdout, stderr) => {
      if (err != null) {
        resolve([err, null]);
      } else if (typeof stderr != "string") {
        resolve([stderror, null]);
      } else {
        resolve([null, stdout]);
      }
    });
  });
}

exports.execute = execute;
