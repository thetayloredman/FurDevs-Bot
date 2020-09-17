const { checkBotOwner } = require("./../utils/permissions")
const { MessageEmbed } = require("discord.js")
const settings = require("./../settings.json")
const Discord = require("discord.js")
Discord.DiscordMenu = require("../utils/DiscordMenu")
var _ = require('lodash');



exports.run = async (client, message, args) => {
    await message.delete()
    if(args[0] === "show"){
    
        if(args[1] === "guild"){
        await checkBotOwner(message)
        const GuildSettings = await message.guild.settings()
        const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`,
            `${message.author.displayAvatarURL({ dynamic: true })}`
        )
        .setColor("#8800FF")
        .setTitle("Guild Settings")
        .addField(`Guild ID:`, `${GuildSettings.guildID}`)
        .addField(`Prefix:`, `${GuildSettings.prefix}`)
        .addField(`Disabled Commands:`, `\`\`\`${GuildSettings.disabledCommands.forEach(cmd => cmd.name)}\`\`\``)
        .addField(`Banker Role (Coming Soon):`, `${GuildSettings.bankerRole}`)
        .addField(`Verification Role:`, `${GuildSettings.verificationRole}`)
        .addField(`Verification Logging:`, `${GuildSettings.verificationLogging}`)
        .addField(`Reputation System:`, `${GuildSettings.reputationSystem}`)
        .addField(`Reputation Emoji:`, `${GuildSettings.reputationEmoji}`)
        .setFooter(`User ID: ${message.author.id}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
        message.channel.send(embed)

    }else{
        throw new Error(`To view guild settings do \`${settings.defaultPrefix}settings show guild\` `)
    }
    }else{
    throw new Error("Where's args[0] ( Show )")
    }
}

exports.help = {
    name: "settings",
    description: "View Database Information on the Bot or the Guild",
    usage: "< show | change > <guild | logging> [ overrideChannel ] ( Only works if you are changeing logging >",
    aliases: ["settings", "config"],
};