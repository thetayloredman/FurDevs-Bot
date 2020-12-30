// Ok drago I gtg for now, however the index is now ts
import { Client, Collection, Structures } from 'discord.js';
import * as chalk from 'chalk';
import { readdirSync } from 'fs';
require("dotenv").config();
require("./structures/Guild")
require("./structures/User")
require("./structures/GuildMember")

class FDClient extends Client implements Client {
    public commands: Collection<unknown, unknown> = new Collection();
    public aliases: Collection<unknown, unknown> = new Collection();

    public fdevsLog: string = `${chalk.cyanBright('[FurDevs - Log]')}`
    public fdevsError: string = `${chalk.redBright('[FurDevs - Error]')}`
    public fwebsLog: string = `${chalk.greenBright('[FurDevs Web - Log]')}` 
}

const client = new FDClient({ disableMentions: "everyone" })
const { load } = require("./utils/utils")

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
        console.log(`${client.fdevsLog} Loading ${dir} Module Which Contains ${cmdFiles.length} commands.`);
        cmdFiles.forEach(cmd => {
            if (!cmd.endsWith(".js")) return;
            const response = load(client, dir, cmd);
            cmds.push(cmd)
            if (response) console.log(response);
        });
    })
    console.log('==================================')
    console.log(`${client.fdevsLog} Loaded a total ${cmds.length} Commands!`)

    const evtFiles = <string[]>await readdirSync("./events/");
    console.log(`${client.fdevsLog} Loading a total of ${evtFiles.length} events.`);
    evtFiles.forEach(evt => {
        const eventName = evt.split(".")[0];
        const event = require(`./events/${evt}`);
        client.on(eventName, event.bind(null, client));
    });

    client.login(process.env.TOKEN);

};

init();