const { checkPermission, checkBotPermission } = require("../../utils/permissions")
const { memberResolver } = require("../../utils/resolvers/member")
const { MessageEmbed } = require("discord.js")
const { addRole  } = require("./../../utils/guild")
exports.run = async (client, message, args) => {
    await message.delete()
    const vMember = memberResolver(message, args[0])
    if(!args[0]){
        throw new Error("Please provide an Mention or User's ID of the User you would like to verify")
    }else if(!args){
        throw new Error("Please provide an image link of the person's verification answers ( Temporary for Version 0.4 as, we'll developing a verification system to do this")
    }
    await checkPermission(message, "MANAGE_ROLES")
    await checkBotPermission(message, "MANAGE_ROLES")
    const guildSettings = await message.guild.settings()

    if(guildSettings.verificationRole){
        await vMember.roles.add(guildSettings.verificationRole, reason);
        return true;
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