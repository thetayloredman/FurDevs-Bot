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
    const profileCard = new MessageEmbed()
    .setTitle(`Profile Card - ${message.author.username}`)
    .addField("Reputation", `${profile.reps}`)
    .addField("XP", `${profile.XP}`)
    .addField("Level", `${profile.level}`)
    .addField("Level Meter", ":blue_square::black_large_square::black_large_square::black_large_square::black_large_square::black_large_square: ( You are x% from reaching level x ) ")
    .setColor("#8800FF")
    .setThumbnail(`${message.author.displayAvatarURL({dynamic:true})}`)
    .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(profileCard)
};

exports.help = {
    name: "profile",
    description: "Get a user's profile card for the guild.",
    usage: "[ User ]",
    aliases: ["pf"],
};