
const { MessageEmbed } = require("discord.js")
const { usernameResolver } = require("./../../utils/resolvers/username")
const moment = require("moment")


exports.run = async (client, message, args) => {
    await message.delete()
    const joinedAt = await message.member.joinedAt
    const createdAt = await message.author.createdAt
    if (!args[0]) {
        let rolemap = message.member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(" ");
        if (rolemap.length > 1024) rolemap = "This User has Too Many Roles to be display.";
        if (!rolemap) rolemap = "No roles";
        let userInfoEmbed = new MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({ dynamic: true })}`
            )
            .setTitle(`🧐 User Information - ${message.author.tag}`)
            .addField(`Joined:`, `${moment(joinedAt).format('LLLL')} ( ${moment(joinedAt).fromNow()} )`)   
            .addField(`Registered:`, `${moment(createdAt).format('LLLL')} ( ${moment(createdAt).fromNow()} )`)   
            .addField(`User ID:`, `${message.author.id}`)   
            .addField(`Roles:`, `${rolemap}`)   
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setColor(`#8800FF`)
            .setTimestamp()
            .setFooter(
                `Requester ID: ${message.author.id}`
            );
            if(beta.includes(message.author.id)){
                userInfoEmbed.addField("Special Acknowledgement" , "Beta Tester")             
            }
            else if(dracyBotDevs.includes(message.author.id)){
                userInfoEmbed.addField("Special Acknowledgement" , "Bot Developer")
            }else if(dracySupportDevs.includes(message.author.id)){
                userInfoEmbed.addField("Special Acknowledgement" , "Bot Support")
            }else if(message.author.id === "563854476021334047"){
                userInfoEmbed.addField("Special Acknowledgement" , "Bot Creator")
            }else{
                // Ignore
            }
        return message.channel.send(userInfoEmbed);
    } else {
        let username = await usernameResolver(message, args[0])
        let target = await message.guild.members.cache.get(username.id)
        const joinedAt = await target.joinedAt
        const createdAt = await target.user.createdAt    
        let rolemap = target.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(r => r)
        .join(" ");
        if (rolemap.length > 1024) rolemap = "This User has Too Many Roles to be display.";
        if (!rolemap) rolemap = "No roles";

        let userInfoEmbed = new MessageEmbed()
            .setAuthor(
                `${target.user.tag}`,
                `${target.user.displayAvatarURL({ dynamic: true })}`
            )
            .setTitle(`🧐  User Information - ${username.username}`)
            .addField(`Joined:`, `${moment(joinedAt).format('LLLL')} ( ${moment(joinedAt).fromNow()} )`)   
            .addField(`Registered:`, `${moment(createdAt).format('LLLL')} ( ${moment(createdAt).fromNow()} )`)   
            .addField(`User ID:`, `${username.id}`)   
            .addField(`Roles:`, `${rolemap}`)  
            .setColor(`#8800FF`)
            .setTimestamp()
            .setFooter(
                `Requester ID: ${username.id}`
            );
            if(beta.includes(username.id)){
                userInfoEmbed.addField("Special Acknowledgement" , "Beta Tester")             
            }
            else if(dracyBotDevs.includes(username.id)){
                userInfoEmbed.addField("Special Acknowledgement" , "Bot Developer")
            }else if(dracySupportDevs.includes(username.id)){
                userInfoEmbed.addField("Special Acknowledgement" , "Bot Support")
            }else if(username.id === "563854476021334047"){
                userInfoEmbed.addField("Special Acknowledgement" , "Bot Creator")
            }else{
                // Ignore
            }
        return message.channel.send(userInfoEmbed);
    }


};

exports.help = {
    name: "userinfo",
    description: "Displays information on about yourself or a speicifed user.",
    usage: "[ Username | Mention | UserID ]",
    aliases: ["user", "whois"],
};


