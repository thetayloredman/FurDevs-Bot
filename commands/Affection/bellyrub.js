const { MessageEmbed } = require('discord.js')

exports.run = async (client, message, args) => {
  await message.delete()
  if (args[0]) {
    const users = []
    message.mentions.users.map(user => {
      users.push(user)
    })
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Belly Rubs!')
      .setColor('#8800FF')
      .setDescription(`
         ${message.author} belly rubbed ${users.join(', ')}'s ${users.includes(client.user) ? 'uwu' : "Dann, y'all should count me in owo"}
        `)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
      .setImage('https://media.giphy.com/media/1P00ZTh1zpww2bnT2v/giphy.gif')

    message.channel.send(embed)
  } else {
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Hugged Yourself?')
      .setColor('#8800FF')
      .setDescription(`
        ${message.author} belly rubbed their own belly qwq
        `)
      .setTimestamp()
      .setImage('https://media.giphy.com/media/gCANwADwdazG8/giphy.gif')
      .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(embed)
  }
}

exports.help = {
  name: 'bellyrub',
  description: 'Rubs someone belly.!',
  usage: '[ Mention ]',
  aliases: []
}
