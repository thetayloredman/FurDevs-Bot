const { Client, Collection, Structures } = require("discord.js");
const { readdirSync } = require("fs")
require("dotenv").config();
require("./structures/Guild")
require("./structures/User")
require("./structures/GuildMember")

const client = new Client({ disableMentions: "everyone" })
const { load } = require("./utils/utils")
client.commands = new Collection();
client.aliases = new Collection();

const mongoose = require("mongoose");

mongoose.connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})


const init = async () => {
    console.log(String.raw` _____           ____                  `)
    console.log(String.raw`|  ___|   _ _ __|  _ \  _____   _____  `)
    console.log(String.raw`| |_ | | | | '__| | | |/ _ \ \ / / __| `)
    console.log(String.raw`|  _|| |_| | |  | |_| |  __/\ V /\__ \ `)
    console.log(String.raw`|_|   \__,_|_|  |____/ \___| \_/ |___/ `)
    console.log(String.raw`====================================== `)
    const cmds = []
    readdirSync("./commands/").forEach(dir => {
       var cmdFiles = readdirSync(`./commands/${dir}/`)
        console.log(`Loading ${dir} Module Which Contains ${cmdFiles.length} commands.`);
        cmdFiles.forEach(cmd => {
            if (!cmd.endsWith(".js")) return;
            const response = load(client, dir, cmd);
            cmds.push(cmd)
            if (response) console.log(response);
        });
    })
    console.log('==================================')
    console.log(`Loaded a total ${cmds.length} Commands!`)

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
