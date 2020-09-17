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
        const GuildSettings = await message.channel.settings()
        const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`,
            `${message.author.displayAvatarURL({ dynamic: true })}`
        )
        .setColor("#8800FF")
        .setTitle("Guild Settings")
        .addField(`Guild ID:`, `${GuildSettings.guildID}`, true)
        .addField(`Prefix:`, `${GuildSettings.prefix}`, true)
        .addField(`Disabled Commands:`, `\`\`\`${GuildSettings.disabledCommands.forEach(cmd => cmd.name)}\`\`\``)
        .addField(`Banker Role (Coming Soon):`, `${GuildSettings.bankerRole}`, true)
        .addField(`Verification Role:`, `${GuildSettings.verificationRole}`, true)
        .addField(`Verification Logging:`, `${GuildSettings.verificationLogging}`, true)
        .addField(`Reputation System:`, `${GuildSettings.reputationSystem}`, true)
        .addField(`Reputation Emoji:`, `${GuildSettings.reputationEmoji}`, true)
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