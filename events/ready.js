const settings = require("./../settings.json")
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

    var twoHours = new CronJob('00 00 2 * * *', async function () {
        const guild = client.guilds.cache.get("731520035717251142")
        const setting = await guild.settings()
        const bumpingChannel = setting.bumpingChannel;
        guild.channels.cache.get(bumpingChannel).send("[ TEST ] Time to bump!")
    }, null, true, 'America/Chicago');
    var sixHours = new CronJob('00 00 6 * * *', async function () {
        const guild = client.guilds.cache.get("731520035717251142")
        const setting = await guild.settings()
        const bumpingChannel = setting.bumpingChannel;
        guild.channels.cache.get(bumpingChannel).send("[ TEST ] Time to bump!")
    }, null, true, 'America/Chicago');
    var twelveHours = new CronJob('00 00 12 * * *', async function () {
        const guild = client.guilds.cache.get("731520035717251142")
        const setting = await guild.settings()
        const bumpingChannel = setting.bumpingChannel;
        guild.channels.cache.get(bumpingChannel).send("[ TEST ] Time to bump!")
    }, null, true, 'America/Chicago');

    var discordme = new CronJob('55 40 5,11,17,23 * * *', async function () {
        const guild = client.guilds.cache.get("731520035717251142")
        const setting = await guild.settings()
        const bumpingChannel = setting.bumpingChannel;
        guild.channels.cache.get(bumpingChannel).send("[ TEST ] Time to bump!")
    }, null, true, 'America/Chicago');

    
    twoHours.start()
    discordme.start();
    twelveHours.start();
    sixHours.start()
    console.log("Bump Reminders Started!")

   
    





}