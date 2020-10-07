const { checkPermission, checkBotPermission } = require("../../utils/permissions")
const { usernameResolver } = require("../../utils/resolvers/username")
const { MessageEmbed } = require("discord.js")
const { addRole  } = require("./../../utils/guild")
exports.run = async (client, message, args) => {
    await message.delete()

    if(!args[0]){
        throw new Error("Please provide an Mention or User's ID of the User you would like to verify")
    }
    var vMember = await usernameResolver(message, args[0]);
    await checkPermission(message, "MANAGE_ROLES")
    await checkBotPermission(message, "MANAGE_ROLES")
    const guildSettings = await message.guild.settings()

    if(guildSettings.verificationRole){
        let member = message.guild.members.cache.get(vMember.id)
        await member.roles.add(guildSettings.verificationRole, `Verificaton Command - Responsible: ${message.author.tag}`);
        message.channel.send(`${member} is now verified for \`${message.guild.name}\` Please Give them a warm welcome in the General Chat!`)
        return true;
    }else{
        throw new Error("The Verification Role does not exist! Please set it up.")
    }
};

exports.help = {
    name: "verify",
    description: "Verify an Specific Member",
    usage: "< Username >",
    aliases: ["verify"],
};