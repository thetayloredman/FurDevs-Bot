const { MessageEmbed } = require("discord.js");
const { CronJob } = require("cron");

module.exports = async (client) => {
  await client.user.setPresence({
    activity: {
      name: "My Furry Friends",
      type: "WATCHING",
    },
  });
  console.log("==================================");

  var twoHours = new CronJob(
    "00 00 2,4,6,8,10,12,14,16,18,20,22 * * *",
    async function () {
      const guild = client.guilds.cache.get("731520035717251142");
      const setting = await guild.settings();
      const bumpingChannel = setting.bumpingChannel;
      const bumpEmbed = new MessageEmbed()
        .setAuthor(
          "Friendly Bump Reminder",
          `${client.user.displayAvatarURL()}`
        )
        .setTitle("Heyo all, It's time to Bump")
        .setURL("https://discord.me/dashboard")
        .addField("Discord.me", "https://discord.me/dashboard")
        .addField("Disboard", "`!d bump`")
        .addField(
          "Top.gg",
          "https://top.gg/servers/731520035717251142/vote"
        )
        .setColor("#8800FF")
        .setFooter(
          "Thanks to Everyone Bumps the server | Once you have bumped, react with ☑ to the post so we know it's been done."
        );
        try{
          guild.channels.cache.get(bumpingChannel).send(bumpEmbed);
        }catch{
          console.log("Failed to send Bump message")
        }
    },
    null,
    true,
    "America/Chicago"
  );

  twoHours.start();
  console.log(`${client.fdevsLog} Bump Reminders Started!`);
  console.log(`${client.fdevsLog} ${client.user.username} is Ready!`);
};
