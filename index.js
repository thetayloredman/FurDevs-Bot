const { Client, Collection, Structures } = require("discord.js");
const { readdirSync } = require("fs")
require("dotenv").config();
const GuildsConfig = require("./database/models/GuildConfig");
const MembersConfig = require("./database/models/MembersConfig");


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

// Per-Member Data
Structures.extend("GuildMember", (GuildMember) => {
    class CoolGuildMember extends GuildMember {
      constructor(client, data, guild) {
        super(client, data, guild);

        // Initialize the guild members
        MembersConfig.findOne({ guildID: this.guild.id, userID: this.user.id }, (err, res) => {
            if(err) return err;
            if(!res){
                const newGuild = new MembersConfig({ guildID: this.guild.id, userID: this.user.id})
                newGuild.save(function(err){
                    if(err){
                        console.log(err)
                    }
                })
                console.log("Created Database Data for a new Server that invited the bot while it was offline")
            }
        })

      }

      // Per-member settings
      async settings() {
        const data = await MembersConfig.findOne({ guildID: guild.id, userID: this.user.id })
        if(data){
            return data
        }
      }

    }

    return CoolGuildMember;
  });

// Users (MUST be included with GuildMember, or these properties cannot be accessed once someone leaves the guild)
Structures.extend("User", (User) => {
    class CoolUser extends User {
      constructor(client, data) {
        super(client, data);
      }

      async guildSettings(guildID) {
        const data = await MembersConfig.findOne({ guildID: guildID, userID: this.id })
        if(data){
            return data
        }
      }
}
    return CoolUser;

  });


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
