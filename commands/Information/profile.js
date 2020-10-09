const { MessageEmbed } = require("discord.js")


exports.run = async (client, message) => {
    await message.delete();
    const profile = await message.member.settings()
    console.log(profile)
    const profileCard = new MessageEmbed()
    .setTitle(`Profile Card - ${message.author.username}`)
};

exports.help = {
    name: "profile",
    description: "Get a user's profile card for the guild.",
    usage: "[ User ]",
    aliases: ["pf"],
};