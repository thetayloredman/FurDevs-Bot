const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
    await message.delete()
  // Credits configurable
    // Note: Field limit means you can only have up to 25 objects in here. Make sure total character count does not exceed 6000.
    var credits = [

      /**
       * Example below here
       */

        // {
        //   names: [`Shadowplays4k#6969`, `LostNuke#9114`, `codic#3754`],
        //   contributions: `Help out Develop Drago's Moderations`,
        // },
      ];
  
      // Construct embed
      var creator = await client.users.fetch(`563854476021334047`);
      let creditsEmbed = new MessageEmbed()
        .setAuthor(
          `${message.author.tag}`,
          `${message.author.displayAvatarURL({ dynamic: true })}`
        )
        .setTitle(`Credits - Bot Developers and Supporters`)
        .setDescription(
          `Please give a warm thanks to the people who made this bot possible:`
        )
        .setColor(`#8800FF`)
        .setTimestamp()
        .setFooter(
          `Bot Creator: ${creator.tag} | User ID: ${message.author.id}`,
          creator.displayAvatarURL({ dynamic: true })
        );
      credits.map((credit) =>
        creditsEmbed.addField(
          `${credit.names.map((name) => `**${name}**`).join(", ")}`,
          credit.contributions
        )
      );
      message.channel.send(creditsEmbed);
};

exports.help = {
    name: "contributions",
    description: "Show's a list of people who helped out with the FurDev's Bot Development.",
    usage: "",
    aliases: ["credits"],
};