const { Structures } = require('discord.js')
const AntiRaidConfig = require("./../database/models/AntiRaidConfig");
const AntiSpamConfig = require("./../database/models/AntiSpamConfig");
const GuildsConfig = require("./../database/models/GuildConfig");
const ModerationConfig = require("./../database/models/ModerationConfig");

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

            AntiRaidConfig.findOne({
                guildID: this.id
            }, (err, res) => {
                if (err) return err;
                if (!res) {
                    const newGuild = new AntiRaidConfig({
                        guildID: this.id
                    })
                    newGuild.save(function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })

                }
            })

            AntiSpamConfig.findOne({
                guildID: this.id
            }, (err, res) => {
                if (err) return err;
                if (!res) {
                    const newGuild = new AntiSpamConfig({
                        guildID: this.id
                    })
                    newGuild.save(function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })

                }
            })
        }

        // per-guild settings
        async settings() {
            try {
                const data = await GuildsConfig.findOne({
                    guildID: this.id,
                })
                if (data) {
                    return data
                } else {
                    throw new Error("Uh cheif, We have a problem")
                }
            } catch (err) {
                throw new Error("Please take a Screenshot of this embed and send it to the Support Server\n\`\`\` " + err + "\`\`\`")
            }
        }

        // Antiraid system
        async antiraid() {
            try {
                const data = await AntiRaidConfig.findOne({
                    guildID: this.id,
                })
                if (data) {
                    return data
                }

            } catch (err) {
                throw new Error("Please take a Screenshot of this embed and send it to the Support Server\n\`\`\` " + err + "\`\`\`")
            }
        }

        // Antispam system
        async antispam() {
            try {
                const data = await AntiSpamConfig.findOne({
                    guildID: this.id,
                })
                if (data) {
                    return data
                }

            } catch (err) {
                throw new Error("Please take a Screenshot of this embed and send it to the Support Server\n\`\`\` " + err + "\`\`\`")
            }
        }

        // Per-guild rules
        async rules() {
            try {
                const data = await RulesConfig.findOne({
                    guildID: this.id,
                })
                if (data) {
                    return data
                }
            } catch (err) {
                throw new Error("Please take a Screenshot of this embed and send it to the Support Server\n\`\`\` " + err + "\`\`\`")
            }
        }

        // Guild moderation logs
        async moderation() {
            try {
                const data = await ModerationConfig.find({
                    guildID: this.id,
                })
                if (data) {
                    return data
                }

            } catch (err) {
                throw new Error("Please take a Screenshot of this embed and send it to the Support Server\n\`\`\` " + err + "\`\`\`")
            }
        }
    }

    return CoolGuild;
});