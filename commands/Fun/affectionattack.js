const { MessageEmbed } = require("discord.js")
const { usernameResolver } = require("./../../utils/resolvers/username")

exports.run = async (client, message, args) => {
    await message.delete();
    if(args[0]){
        const username = args[0]
        var affected = await usernameResolver(message, username)
    }
        const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`, 
            `${message.author.displayAvatarURL({dynamic: true})}`
        )
        .setTitle("AFFECTION ATTACK!")
        .setColor("#ff00ce")
        .setFooter(`User ID: ${message.author.id}`)
        .setDescription(`${affected} gets attacted with affection by ${message.author}! Aww That's Cute >w<`)
        .setTimestamp();
        message.channel.send(embed)
};

exports.help = {
    name: "affectattack",
    description: "Attack somone with affection!",
    usage: "[ username | mention | ID ]",
    aliases: ["affection", "affect", "attack"],
};