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
      .setTitle('Hugs!')
      .setColor('#8800FF')
      .setDescription(`
        ${users.join(', ')} got hugged by ${message.author} That's very cute ^w^
        `)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(embed)
  } else {
    const embed = new MessageEmbed()
      .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
      .setTitle('Hug?')
      .setColor('#8800FF')
      .setDescription(`
        ${message.author} Hug themselves... Poor Dude aye yo someone hug this person :C
        `)
      .setTimestamp()
      .setFooter(`User ID: ${message.author.id}`)
    message.channel.send(embed)
  }
}

exports.help = {
  name: 'hug',
  description: 'Hug Someone or yourself.!',
  usage: '[ Mention ]',
  aliases: []
}
