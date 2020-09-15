function checkBotPermission(message, permission) {
    if (!message.guild.me.hasPermission(permission)) {
        throw new Error(`This requires me to have \`${permission}\` permissions, but I do not have them!`);
      }
}

exports.checkBotPermission = checkBotPermission