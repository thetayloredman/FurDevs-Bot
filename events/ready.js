const settings = require("./../settings.json")
const { CronJob } = require("cron")

module.exports = async client => {
        await client.user.setPresence({
            activity: {
                name: "My Furry Friends",
                type: "WATCHING",
            }
        })
        console.log('==================================')
        console.debug(`${client.user.username} is Ready!`);
        
        var two = async () => {
            
            const guild = client.guilds.cache.get("778333835967594517")
            const setting = await guild.settings() 
            const bumpingChannel = setting.bumpingChannel;
            guild.channels.cache.get(bumpingChannel).send("Time to bump!")
        }

        var six = async () => {
            
            const guild = client.guilds.cache.get("778333835967594517")
            const setting = await guild.settings() 
            const bumpingChannel = setting.bumpingChannel;
            guild.channels.cache.get(bumpingChannel).send("Time to bump!")
        }

        var twelve = async () => {
            
            const guild = client.guilds.cache.get("778333835967594517")
            const setting = await guild.settings() 
            const bumpingChannel = setting.bumpingChannel;
            guild.channels.cache.get(bumpingChannel).send("Time to bump!")
        }

        var discordme = async () => {
            
            const guild = client.guilds.cache.get("778333835967594517")
            const setting = await guild.settings() 
            const bumpingChannel = setting.bumpingChannel;
            guild.channels.cache.get(bumpingChannel).send("Time to bump!")
        }
        
        var dme = new CronJob('0 55 5,11,17,23 * * * ', discordme, null, true, 'America/Chicago');
        
        var twos = new CronJob('0 55 0/2 * * * ', two, null, true, 'America/Chicago');
        
        var sixs = new CronJob('0 55 0/2 * * * ', six, null, true, 'America/Chicago');
        
        var twelves = new CronJob('0 55 0/2 * * *', twelve, null, true, 'America/Chicago');
        
        var twelves = new CronJob('0 55 0/2 * * *', twelve, null, true, 'America/Chicago');
        
        dme.start()
        twos.start()
        sixs.start()
        twelves.start()
    }
