const { checkPermission, checkBotPermission } = require("./../utils/permissions")
const { usernameResolver } = require("./../utils/resolvers/username")
const { MessageEmbed } = require("discord.js")

exports.run = async (client, message, args) => {
    await message.delete()
    const vMember = usernameResolver(message, args[0])
    if(!args[0]){
        throw new Error("Please provide an Username, Mention or User's ID of the User you would like to verify")
    }
    await checkPermission(message, "MANAGE_ROLES")
    await checkBotPermission(message, "MANAGE_ROLES")
    const guildSettings = await message.guild.settings()
    console.log(guildSettings)
    if(guildSettings.verificationRole){
       message.guild.members.cache.get(vMember.id).roles.add(guildSettings.verificationRole)
    }else{
        throw new Error("The Verification Role does not exist! Please set it up.")
    }
};

exports.help = {
    name: "verify",
    description: "Verify an Specific Member",
    usage: "< User ID >",
    aliases: [],
};