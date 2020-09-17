const { Client, Collection, Structures } = require("discord.js");
const { readdirSync } = require("fs")
require("dotenv").config();
const GuildsConfig = require("./database/models/GuildConfig");


// Guilds
Structures.extend("Guild", (Guild) => {
    class CoolGuild extends Guild {
        constructor(client, data) {
            super(client, data);
            GuildsConfig.findOne({
                guildID: this.id
            }, (err, res) => {
                if (err) return err;
                if (!res) {
                    const newGuild = new GuildsConfig({
                        guildID: this.id
                    })
                    newGuild.save(function (err) {
                        if (err) {
                            console.log(err)
                        }
                        console.log("Guild Settings have been created")
                    })
                    

                }
            })
        }

        // per-guild settings
        async settings() {
            const data = await GuildsConfig.findOne({
                guildID: this.id,
            })
            if (data) {
                return data
            } else {
                throw new Error("Uh cheif, We have a problem")
            }
        }
    }

    return CoolGuild;
});


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
