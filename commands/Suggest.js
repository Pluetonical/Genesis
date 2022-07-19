const { MessageEmbed, DiscordAPIError } = require("discord.js");
const { DurationFormatter } = require("@sapphire/time-utilities");
const durationFormatter = new DurationFormatter();
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const Discord = require('discord.js')


exports.run = (client, message, args, level, interaction) => { // eslint-disable-line no-unused-vars
  const duration = durationFormatter.format(client.uptime);
  const talkedRecently = new Set()
  
  if (!args[0] ) return message.channel.send("<:icons_outage:995547920587825183> | Please provide a suggestion!");
  
   
  const acceptbutton = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton().setCustomId("accept").setLabel("Accept Suggestion").setStyle("SUCCESS")
  ); 

  const denybutton = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton().setCustomId("deny").setLabel("Deny Suggestion").setStyle("DANGER")
  );
    client.channels.cache.get('997638155412975697').send({embeds: [new Discord.MessageEmbed().setTitle("<:icons_star:995544904388333628> | New Suggestion").setColor("#2F3136").setDescription(`**Suggestion:** ${args[0]}`).setFooter(`Suggested By: ${message.author.username}` ).setTimestamp()], components: [acceptbutton] });
    message.channel.send("<:icons_activities:995546445618884659> | Your suggestion has been added, check <#997638155412975697>!");
    message.delete();

    

    
    




  /* message.reply("Fetching!").then(async (msg) => {
    const embed = new MessageEmbed()
      .setTitle("Bot Statistics")
      .setColor("#ffcd00")
      .setDescription(`**Memory Usage** - ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n**Uptime** - ${duration}\n**Bot Latency** - ${msg.createdTimestamp - message.createdTimestamp}ms\n**API Latency** - ${Math.round(message.client.ws.ping)}ms\n**Node version** - ${process.version}`)
      .setTimestamp();

    msg.edit({ content: " ", embeds: [embed] });
  
  });
  */
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Dev"
};

exports.help = {
  name: "suggest",
  category: "Basic",
  description: "suggest something!",
  usage: "suggest"
};