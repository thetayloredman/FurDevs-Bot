const { checkPermission, checkBotPermission } = require("../../utils/permissions")
const { usernameResolver } = require("../../utils/resolvers/username")
const { MessageEmbed } = require("discord.js")
const { addRole  } = require("./../../utils/guild")
exports.run = async (client, message, args) => {
    await message.delete()
    const vMember = usernameResolver(message, args[0])
    if(!args[0]){
        throw new Error("Please provide an Username, Mention or User's ID of the User you would like to verify")
    }else if(!args){
        throw new Error("Please provide an image link of the person's verification answers ( Temporary for Version 0.4 as, we'll developing a verification system to do this")
    }
    await checkPermission(message, "MANAGE_ROLES")
    await checkBotPermission(message, "MANAGE_ROLES")
    const guildSettings = await message.guild.settings()

    if(guildSettings.verificationRole){
        const role = await message.guild.roles.resolve(guildSettings.verificationRole)
        await addRole(message, vMember, verificationRole, `Verification Command\nResponsible: ${message.author.tag}`).catch(err => {
            console.log(err)
        })
    }else{
        throw new Error("The Verification Role does not exist! Please set it up.")
    }
};

exports.help = {
    name: "verify",
    description: "Verify an Specific Member",
    usage: "< Username >",
    aliases: [],
};