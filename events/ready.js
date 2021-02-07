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

  console.log(`${client.fdevsLog} Bump Reminders Started!`);
  console.log(`${client.fdevsLog} ${client.user.username} is Ready!`);
};
