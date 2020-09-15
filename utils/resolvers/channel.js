const channelRegex = /^(?:<#)?(\d{17,19})>?$/
const userOrMemberRegex = /^(?:<@!?)?(\d{17,19})>?$/

async function channelResolver(client, mention) {
    const channel = channelRegex.test(mention)
    ? await client.channels.fetch(channelRegex.exec(mention))
            .catch(() => null ) : null;
    if(channel) return channel;

    const user = userOrMemberRegex.test(mention)
    ? await client
            .users.fetch(userOrMemberRegex.exec(
                mention)[1]
            )
            .catch(() => null)
        : null;
    if(user) return user.createDM()
    throw new Error(`Invalid Channel: ${mention}`)

}

exports.channelResolver = channelResolver