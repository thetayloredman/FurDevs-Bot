const { Structures } = require("discord.js")
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
