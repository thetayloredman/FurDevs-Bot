const { Structures } = require("discord.js")
const MembersConfig = require("./database/models/MembersConfig");

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