const { MessageEmbed } = require("discord.js");
const { checkBotOwner } = require("./../utils/permissions")
const beautify = require("beautify");

exports.run = async (client, message, args) => {
    await message.delete()
    await checkBotOwner(message)
    if(!args[0]){
        throw new Error("Please Provide JS Code you would like to Evaluate\n Usage: \`J>eval < Code to Evaluate >\`")
    }

        var script = args.join(' ')

        // Evaluate the script
        const evaluated = eval(script);
        if(typeof evaled !== "string"){
            let evaled;
            evaled = require("util").inspect(evaluated, { depth: 5 })
            
            if((evaled).includes(".env")) evaled = evaled.replace(".env", "Token goes brrrr")
            if(evaled === undefined ) throw new Error("Evaluated Undefined Code :/")
            
            
                    // Process the output
                    const embed = new MessageEmbed()
                        .setAuthor(
                        `${message.author.tag}`,
                        `${message.author.displayAvatarURL({ dynamic: true })}`
                        )
                        .setTitle(`Evaluate`)
                        .setColor(`#8800FF`)
                        .setTimestamp()
                        .addField(
                        ":inbox_tray: Input: ",
                        `\`\`\`js\n ${beautify(script, { format: "js" })} \`\`\``
                        )
                        .addField(":outbox_tray: Output", `\`\`\`${evaluated}\`\`\``)
                        .addField("Type of: ", `\`\`\`${typeof evaluated}\`\`\``)
                        .setFooter(`User ID: ${message.author.id}`)
                        .setThumbnail(client.user.displayAvatarURL({ dynamic: true }));
            
                        // Credits to Mozza 
                        if(evaluated["then"]){
                            let res = Promise.resolve(evaled)
                            embed.addField(`📖 Promise Output:`, `\`\`\`${require("util").inspect(res)}\`\`\``)
                        }
        }

    return message.channel.send(embed);

};

exports.help = {
    name: "eval",
    description: "Get the bot's ping",
    usage: "eval",
    aliases: ["evaluate", "e"],
};