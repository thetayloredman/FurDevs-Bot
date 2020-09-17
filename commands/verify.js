const { checkPermission, checkBotPermission } = require("./../utils/permissions")
const { usernameResolver } = require("./../utils/resolvers/username")
const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    await message.delete()
    await checkPermission(message, "MANAGE_ROLES")
    await checkBotPermission(message, "MANAGE_ROLES")
    const guildSettings = await message.guild.settings()
    if(guildSettings.)
    const vMember = usernameResolver(message, args[0])
};

exports.help = {
    name: "verify",
    description: "Verify an Specific Member",
    usage: "< User ID >",
    aliases: [],
};