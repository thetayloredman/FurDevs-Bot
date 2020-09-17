const { Client, Collection, Structures } = require("discord.js");
const { readdirSync } = require("fs")
require("dotenv").config();
const client = new Client({ disableMentions: "everyone" })
const { load } = require("./utils/utils")

client.commands = new Collection();
client.aliases = new Collection();

const init = async () => {
    const cmdFiles = await readdirSync("./commands/");
    console.log(`Loading a total of ${cmdFiles.length} commands.`);
    cmdFiles.forEach(cmd => {
        if (!cmd.endsWith(".js")) return;
        const response = load(client, cmd);
        if (response) console.log(response);
    });

    const evtFiles = await readdirSync("./events/");
    console.log(`Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(evt => {
        const eventName = evt.split(".")[0];
        const event = require(`./events/${evt}`);
        client.on(eventName, event.bind(null, client));
    });

    client.login(process.env.TOKEN);

};

init();
