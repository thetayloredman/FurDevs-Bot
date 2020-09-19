const { checkPermission, checkBotPermission } = require("./../utils/permissions")
const { usernameResolver } = require("./../utils/resolvers/username")
const { roleResolver } = require("./../utils/resolvers/role")
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
    console.log(client.users.resolve(vMember))
    if(guildSettings.verificationRole){
        const role = await message.guild.roles.cache.get(guildSettings.verificationRole)
        console.log(role)
      vMember.roles.add(role, [`Verification - ${message.author.username} `])
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