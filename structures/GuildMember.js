const { Structures } = require('discord.js')
const ModerationConfig = require("./../database/models/ModerationConfig");
const MembersConfig = require("./../database/models/MembersConfig");



// Guild members
Structures.extend("GuildMember", (GuildMember) => {
    class CoolGuildMember extends GuildMember {
        constructor(client, data, guild) {
            super(client, data, guild);

            // Initialize the guild members
            MembersConfig.findOne({
                guildID: this.guild.id,
                userID: this.id
            }, (err, res) => {
                if (err) return err;
                if (!res) {
                    const newGuild = new MembersConfig({
                        guildID: this.guild.id,
                        userID: this.id
                    })
                    newGuild.save(function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })

                }
            })
        }

        // Per-member settings
        async settings() {
            const data = await MembersConfig.findOne({
                guildID: this.guild.id,
                userID: this.id
            })
            if (data) {
                return data
            }
        }

        // Member moderation logs
        async moderation() {
            const data = await ModerationConfig.find({
                guildID: this.guild.id,
                userID: this.id
            })
            if (data) {
                return data
            }
        }
    }

    return CoolGuildMember;
});
