const Discord = require("discord.js");
const config = require("../config.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const embed = new Discord.MessageEmbed()
    .setColor("#2F3136")
    .setTitle("Genesis - Bot Invite Link")
    .setThumbnail(config.logo)
    .setDescription("You can invite the Discord bot to your own server by using this [link](https://discord.com/api/oauth2/authorize?client_id=995918163139113001&permissions=8&scope=applications.commands%20bot).\n\n**Note:** Servers only have limited commands.")
    .setFooter(`Command requested by ${message.author.tag}`, message.author.displayAvatarURL());

  message.reply({ embeds: [embed] });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "invite",
  category: "Basic",
  description: "Displays The Bot's Invite Link \n\n**Note:** Servers only have **limited** commands",
  usage: "invite"
};