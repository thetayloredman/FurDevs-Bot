const { MessageEmbed } = require("discord.js")

module.exports = async (client, message) => {
    if (message.author && message.author.id === client.user.id) return;
    if (message.author.bot) return;
    if (!message.guild && message.author) {
        message.author.send(
            `Oh hi there! Sorry but I don't really have anything to say in DMs. Please talk to me in a guild.`
        );
        return;
    }


    var GuildConfig = await message.guild.settings()
    var { errorLogChannel } = require("../settings.json")
    var command;
    var commandParts;
    
    // If the user pings the bot the bot will respond with it's prefix
    const mentionRegex = RegExp(`^<@!${client.user.id}>$`);
    const mentionRegexPrefix = RegExp(`^<@!${client.user.id}> `);
    if (message.content.match(mentionRegex)) {
        return message.channel.send(`Heya ${message.author}! My Prefix is \`${GuildConfig.prefix}\``);
    }
    
    var prefix =  message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : GuildConfig.prefix;
    // Is a command by a guild member who is not a bot? If so execute it
    if(message.content.startsWith(prefix)){
        if(message.member && message.author && !message.author.bot){
            commandParts = message.content.slice(prefix.length).trim().split(/ +/g);
            const command = commandParts.shift().toLowerCase();
            const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
            // If the Command cannot be Found
            if (!cmd) {
                /*
                    Deprecated since it's not considered a good practive for discord bots
                */

                // const errorMessage = new MessageEmbed()
                //     .setAuthor(
                //         `${message.author.tag}`,
                //         `${message.author.displayAvatarURL({ dynamic: true })}`
                //     )
                //     .setTitle(`❌ ${command} - Invalid Command`)
                //     .setColor(`#ee110f`)
                //     .setFooter(`User ID: ${message.author.id}`)
                //     .setThumbnail(
                //         `https://cdn.discordapp.com/emojis/604486986170105866.png?v=1`
                //     );
                // message.channel
                //     .send(errorMessage)
                //     .then((a) => a.delete({ timeout: 15000 }));
                return console.log(`Discord: Command Invalid: ${command} by ${message.author.tag}`)
            }else{
                try{
                        await cmd.run(client, message, commandParts);
                }catch (e) {
                    try{
                        const errorMessage = new MessageEmbed()
                        .setTitle("❌ An Error has Occured!")
                        .setDescription(`\`${command}\` failed to execute with this error \n\n${e.message}\n\u200b`)
                        .setColor("#ee110f")
                        client.channels.cache.get(errorLogChannel).send(errorMessage).then((msg) => {
                        console.log(`${client.fdevsError}: ${command} was executed but failed with an error;\n${msg.url}`)
                    })
                }catch{
                        console.log(`${client.fdevsError}: ${command} was executed but failed with an error;\n${e}`)
                        return;
                    }
                    const errorMessage = new MessageEmbed()
                        .setTitle("❌ An Error has Occured!")
                        .setDescription(`${e.message}\n\u200b`)
                        .setColor("#ee110f")
                        .setThumbnail(
                            `https://cdn.discordapp.com/emojis/604486986170105866.png?v=1`
                        )
                        .setFooter("If you do not understand the error, contact the Bot Developers")
                    // TODO: Error Messages with GIFs/Images if a Link exist
                    message.channel
                        .send(errorMessage)
                        .then((a) => a.delete({ timeout: 15000 }))
                    console.log(e)
                }
            }
            console.log(`Discord: Command Executed: ${command} by ${message.author.tag}`)

        }
    }};