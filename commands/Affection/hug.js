const { MessageEmbed } = require("discord.js")
const { usernameResolver } = require("../../utils/resolvers/username")
const fetch = require("node-fetch")

exports.run = async (client, message, args) => {
    await message.delete();
    if(args[0]){
        const yes = args[0]
        var username = await usernameResolver(message, yes)
    }else{
        const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTitle("Hugged Yourself?")
        .setColor("#8800FF")
        .setDescription(`
        ${message.author} Hug themselves... Poor Dude aye yo someone hug this person :C
        `)
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(embed)
    }
    const embed = new MessageEmbed()
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTitle("Hugged by Someone")
        .setColor("#8800FF")
        .setDescription(`
        ${username} got hugged by ${message.author}'s That's very cute ^w^
        `)
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(embed)
};

exports.help = {
    name: "hug",
    description: "Hug Someone or yourself.!",
    usage: "[ Mention ]",
    aliases: [],
};