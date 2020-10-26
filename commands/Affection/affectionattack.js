const { MessageEmbed } = require("discord.js")
const { usernameResolver } = require("../../utils/resolvers/username")
let affected = [];

exports.run = async (client, message, args) => {
    await message.delete();
    if(args[0]){
        message.mentions.users.map(user => {
            affected.push(user)
        })
    }else{
        throw new Error("Who are we affecting now?")
    }
        const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`, 
            `${message.author.displayAvatarURL({dynamic: true})}`
        )
        .setTitle("AFFECTION ATTACK!")
        .setColor("#8800FF")
        .setFooter(`User ID: ${message.author.id}`)
        .setDescription(`${affected.join(", ")} gets attacked with affection by ${message.author}! Aww That's Cute >w<`)
        .setImage("https://media.giphy.com/media/IJKvZrT21x6k8/giphy.gif")
        .setTimestamp();
        message.channel.send(embed)
};

exports.help = {
    name: "affectattack",
    description: "Attack somone with affection!",
    usage: "[ Mention ]",
    aliases: ["affection", "affect", "attack"],
};