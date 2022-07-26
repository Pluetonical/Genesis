const Discord = require('discord.js');



exports.run = (client, message, args) => {
	
	const guild = client.guilds.cache.get("925160468476207114");
	var userCount = guild.memberCount;
	var onlineCount = guild.members.cache.filter(m => m.presence.status === 'online').size
	var memberCount = guild.members.cache.filter(member => !member.bot).size;
	var botCount = guild.members.cache.filter(member => member.user.bot).size;
  console.log(botCount)
   const embed = new Discord.MessageEmbed()
   .setColor("#2F3136")
   .setTitle("Genesis - Discord Status")
   .setDescription("Here are the current Genesis Discord Stats!")
   .addField(`Total user count:`, `**${userCount}**`)
   .addField(`user's online: `, `**${onlineCount}**`, true)
   .addField(`Member Count: `, `${memberCount}`, true)
   .addField(`Bot Count`, `${botCount}`,  true)
   .setFooter(`Command requested by ${message.author.tag}`, message.author.displayAvatarURL());
   

	message.channel.reply({embeds: [embed], content: 'Was this Information Helpful?', components: []}).then((message) => {
        message.react("<:icons_Correct:995546257923768380>").then(() => {
          message.react("<:icons_Wrong:995545123142254612>");
        });
	});
};
exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ["ds"],
	permLevel: "User" 
  };
  
  exports.help = {
	name: "discordstatus",
	category: "Basic",
	description: "check discord status",
	usage: "discordstatus"
  };