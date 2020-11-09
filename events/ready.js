const settings = require("./../settings.json")

module.exports = async client => {
        await client.user.setPresence({
            activity: {
                name: "My Furry Friends",
                type: "WATCHING",
            }
        })
        console.log('==================================')
        console.debug(`${client.user.username} is Ready!`);
};