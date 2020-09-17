const exec = require("child_process").exec;
const random = require("crypto-random-string");


function load(client, command){
    try {
        const props = require(`../commands/${command}`);
        if (props.init) {
            props.init(client);
        }
        client.commands.set(props.help.name, props);
        props.help.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
        return false;
    } catch (e) {
        return `Error: Unable to load command ${command}: ${e}`;
    }
}

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

function uid(){
    var intial = Date.now().toString(16);
    return `${inital}${random({ length: 16 - intial.length })}`
}






exports.execute = execute;
exports.uid = uid
exports.load = load