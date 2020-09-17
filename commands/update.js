const { MessageEmbed } = require("discord.js");
const { checkBotOwner } = require("./../utils/permissions")
const { execute } = require("./../utils/utils");

exports.run = async (client, message) => {
    await message.delete()
    await checkBotOwner(message)
    const embed = new MessageEmbed()
        .setAuthor(
            `${message.author.tag}`,
            `${message.author.displayAvatarURL({ dynamic: true })}`
        )
        .setTitle(`Update - Updating bot...`)
        .setColor(`BLUE`)
        .setDescription(`This may take a bit...`)
        .setTimestamp()
        .setFooter(`User ID: ${message.author.id}`);
    var message = await message.channel.send(embed);

    // Execute the update script
    let result = await execute("sh update.sh");

    // Send the result
    if (result[0]) {
        throw new Error(result[0]);
    } else {
        const output = result.slice(1)
        const complete = new MessageEmbed()
            .setAuthor(
                `${message.author.tag}`,
                `${message.author.displayAvatarURL({ dynamic: true })}`
            )
            .setColor(`#8800FF`)
            .setTitle(`Update - Bot was updated!`)
            .setDescription(
                `You may now use the reload command to reload the bot with the New Features. \n \`\`\`${output}\`\`\``
            )
            .setTimestamp()
            .setFooter(`User ID: ${message.author.id}`);
        message.edit(complete);
    }
};

exports.help = {
    name: "update",
    description: "Update the bot.",
    usage: "update",
    aliases: [],
};