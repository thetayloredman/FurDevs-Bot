const { botOwner } = require("../../settings.json")

function checkBotOwner(message) {
    if (!botOwner === message.author.id) {
        throw new Error(`This command may only be used by the bot owner`);
    }
}

exports.checkBotOwner = checkBotOwner