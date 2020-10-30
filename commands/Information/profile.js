const { MessageEmbed } = require("discord.js")

// Joined the Server
// Badges
// Reputation
// Level
// XP
// Membership Type ( Regular, Member, Staff )



exports.run = async (client, message) => {
    await message.delete();
    const profile = await message.member.settings()
    console.log(profile)
    const profileCard = new MessageEmbed()
    .setTitle(`Profile Card - ${message.author.username}`)
    message.channel.send(profileCard)
};

exports.help = {
    name: "profile",
    description: "Get a user's profile card for the guild.",
    usage: "[ User ]",
    aliases: ["pf"],
};