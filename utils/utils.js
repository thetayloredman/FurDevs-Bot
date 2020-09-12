const { MessageEmbed } = require("discord.js");
const { botOwner } = require("./../settings.json")


    function load(client, command){
        try {
            const props = require(`../commands/${command}`);
            if (props.init) {
                props.init(client);
            }
            client.commands.set(props.help.name, props);
            props.help.aliases.forEach(alias => {
                client.aliases.set(alias, props.help.name);
            });
            return false;
        } catch (e) {
            return `Error: Unable to load command ${command}: ${e}`;
        }
    }


function checkBotOwner (message){
    if(botOwner.includes(message.author.id)){
        return true;
    }else{
        const embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL()}`)
        .setDescription("❌ You are not a Bot Developer therefore you're not allowed to execute this command")
        return message.channel.send(embed)
    }
};




exports.load = load
exports.checkBotOwner = checkBotOwner