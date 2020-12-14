const settings = require("./../settings.json")
const fetch = require('node-fetch');
const { MessageEmbed } = require("discord.js")
const {
    CronJob  
} = require("cron")

module.exports = async client => {
    await client.user.setPresence({
        activity: {
            name: "My Furry Friends",
            type: "WATCHING",
        }
    })
    console.log('==================================')
    console.debug(`${client.user.username} is Ready!`);

    var twoHours = new CronJob('00 00 2,6,10,14,18,22 * * *', async function () {
        const guild = client.guilds.cache.get("731520035717251142")
        const setting = await guild.settings()
        const bumpingChannel = setting.bumpingChannel;
        const bumpEmbed = new MessageEmbed()
        .setAuthor("Friendly Bump Reminder", `${client.user.displayAvatarURL()}`)
        .setTitle("Heyo all, It's time to Bump")
        .setURL("https://discord.me/dashboard")
        .addField("Discord.me", "https://discord.me/dashboard")
        .addField("Disboard", "`!d bump`")
        .addField("Discordservers.com", "https://discordservers.me/servers/731520035717251142/upvote")
        .addField("Discord Server List ( Top.gg )", "https://top.gg/servers/731520035717251142/vote")
        .addField("Server Monitoring", "`!bump`")
        .addField("DiscordServer", "`|bump`")
        .addField("DiscordList.io", "`dlm!bump`")
        .setFooter("Thanks to Everyone Bumps the server | Once you have bumped, react with ☑ to the post so we know it's been done.")
        guild.channels.cache.get(bumpingChannel).send("<@&778347045550424064>", {
            embed:bumpEmbed
        })
    }, null, true, 'America/Chicago');

    var fourHours = new CronJob('00 00 4,8,12,16,20,0 * * *', async function () {
        const guild = client.guilds.cache.get("731520035717251142")
        const setting = await guild.settings()
        const bumpingChannel = setting.bumpingChannel;
        const bumpEmbed = new MessageEmbed()
        .setAuthor("Friendly Bump Reminder", `${client.user.displayAvatarURL()}`)
        .setTitle("Heyo all, It's time to Bump")
        .setURL("https://discord.me/dashboard")
        .addField("Discord.me", "https://discord.me/dashboard")
        .addField("Disboard", "!d bump")
        .addField("Discordservers.com", "https://discordservers.me/servers/731520035717251142/upvote")
        .addField("Discord Server List ( Top.gg )", "https://top.gg/servers/731520035717251142/vote")
        .addField("Server Monitoring", "`!bump`")
        .addField("DiscordServer", "`|bump`")
        .addField("DiscordList.io", "`dlm!bump`")
        .setFooter("Thanks to Everyone Bumps the server | Once you have bumped, react with ☑ to the post so we know it's been done.")
        guild.channels.cache.get(bumpingChannel).send("<@&778347045550424064> | <@&778349310986289162>", {
            embed:bumpEmbed
        })
    }, null, true, 'America/Chicago');

    var discordme = new CronJob('40 55 5,11,17,23 * * *', async function () {
        const guild = client.guilds.cache.get("731520035717251142")
        const setting = await guild.settings()
        const bumpingChannel = setting.bumpingChannel;
        const bumpEmbed = new MessageEmbed()
        .setAuthor("Friendly Bump Reminder", `${client.user.displayAvatarURL()}`)
        .setTitle("Heyo all, It's time to Bump")
        .setURL("https://discord.me/dashboard")
        .setFooter("Thanks for Ever Bumpe the server")
        .setFooter("Thanks to Everyone Bumps the server | Once you have bumped, react with ☑ to the post so we know it's been done.")
        guild.channels.cache.get(bumpingChannel).send("<@&778347041365295164>", {
            embed:bumpEmbed
        })
    }, null, true, 'America/Chicago');

    
    twoHours.start()
    fourHours.start()
    discordme.start();
  
    console.log("Bump Reminders Started!")

   
    





}
