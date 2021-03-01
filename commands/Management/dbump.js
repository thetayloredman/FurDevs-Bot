const { MessageEmbed } = require("discord.js")

function sendEmbed(){
	const guild = client.guilds.cache.get("731520035717251142");
	const setting = await guild.settings();
	const bumpingChannel = setting.bumpingChannel;
	const bumpEmbed = new MessageEmbed()
	.setAuthor(
	  "Friendly Bump Reminder",
	  `${client.user.displayAvatarURL()}`
	)
	.setTitle("Heyo all, It's time to Bump")
	.setURL("https://discord.me/dashboard")
	.addField("Discord.me", "https://discord.me/dashboard")
	.addField("Disboard", "`!d bump`")
	.addField(
	  "Top.gg",
	  "https://top.gg/servers/731520035717251142/vote"
	)
	.setColor("#8800FF")
	.setFooter(
	  "Thanks to Everyone Bumps the server | Once you have bumped, react with ☑ to the post so we know it's been done.\nThis message is automagically sent 2 hours after each disboard bump!"
	);
	try{
	  guild.channels.cache.get(bumpingChannel).send(bumpEmbed);
	}catch{
	  console.log("Failed to send Bump message")
	}
}

exports.run = async (client, message, args) => {
	setTimeout(sendEmbed, 7200000, 'BumpEmbed');
}