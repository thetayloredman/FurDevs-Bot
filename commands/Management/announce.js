const { MessageEmbed } = require("discord.js")
const { channelResolver } = require("./../../utils/resolvers/channel")
const { checkPermission } = require("./../../utils/permissions")

exports.run = async (client, message, args) => {
    // Delete the original command message
    message.delete();

    checkPermission(message, "MANAGE_SERVER")

    if(args[0] && args[1]){
    
    
    const chan = await channelResolver(client, args[0])
    const announcement = args.slice(1).join(" ")
    
    const embed = new MessageEmbed()
    .setAuthor(
      `${message.author.tag}`,
      `${message.author.displayAvatarURL({ dynamic:true })}`
    )
    .setTitle(`Announcement!`)
    .setDescription(announcement)
    .setTimestamp()
    .setThumbnail("https://cdn.discordapp.com/emojis/714783867269283932.gif?v=1")
    .setFooter(`User ID: ${message.author.id}`)
    .setColor(`#8800FF`);
    chan.send(embed)
    }else if(!args[0]){
        throw new Error("Please provide an Channel for me to send the announcement")
    }else{
        throw new Error("What should I announce?")
    }

};


exports.help = {
    name: "announce",
    description: "Make an Announcement.",
    usage: "< Channel ID/Mention > < Message >",
    aliases: [],
};