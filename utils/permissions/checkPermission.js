function checkPermission(message, permission) {
    if (!message.member.hasPermission(permission)) {
        throw new Error(`This requires \`${permission}\` permissions, but you do not have them!`);
      }
}

exports.checkPermission = checkPermission