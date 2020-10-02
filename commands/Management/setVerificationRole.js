const Discord = require("discord.js")
const { checkBotOwner } = require("../../utils/permissions")
const GuildConfig = require("../../database/models/GuildConfig")
const { roleResolver } = require("./../../utils/resolvers/role")

exports.run = async (client, message, args) => {
    // Delete the original command message
    message.delete();
    await checkBotOwner(message);
    var GuildSettings = await message.guild.settings()

    if(args[0]) {
        var role = await roleResolver(message, args[0])
        console.log(role.id)
        // This command may only be used by the bot owner

        // Update the prefix in the database
        await GuildConfig.updateOne(
            { guildID: message.guild.id },
            { verificationRole: role.id }
        );

        // Return message
        const embed = new Discord.MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({dynamic: true})}`
            )
            .setTitle(`Verification - The Role is Updated!`)
            .setDescription(`The Current Verified Role set for this Verification is \n<@&${GuildSettings.verificationRole}>`)
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`)
            .setColor(`#8800FF`);
        return message.channel.send(embed);
    }
        if (!role) {
            var id = await GuildSettings.verificationRole
            console.log(id)
            const embed = new Discord.MessageEmbed()
                .setAuthor(
                    `${message.author.tag}`,
                    `${message.author.displayAvatarURL({dynamic: true})}`
                )
                .setTitle(`Verification - Current Role!`)
                .setDescription(`The Current Verified Role set for this Verification is <@&${GuildSettings.verificationRole}>\n\nIf you wish to change that role you can do \n\`${GuildSettings.prefix}setVerificationRole < Mention Role >\``)
                .setTimestamp()
                .setFooter(`User ID: ${message.author.id}`)
                .setColor(`#8800FF`)
            return message.channel.send(embed);
        }
}
    exports.help = {
        name: "setverificationrole",
        description: "Change the role that members will get if you execute the verify command on that member.",
        usage: "[ Role Mention ]",
            aliases: ["verifyrole"],
    }
