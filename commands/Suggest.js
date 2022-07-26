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
  
   
  const button = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton().setCustomId("acceptsuggest").setLabel("Accept Suggestion").setStyle("SUCCESS"),
    new Discord.MessageButton().setCustomId("denysuggest").setLabel("Deny Suggestion").setStyle("DANGER"),
    new Discord.MessageButton().setCustomId("upvote").setEmoji('<:icons_upvote:995545071795572758>').setLabel("Up Vote").setStyle("SECONDARY"),
    new Discord.MessageButton().setCustomId("downvote").setEmoji('<:icons_downvote:995546425704333322>').setLabel("Down Vote").setStyle("SECONDARY")
  ); 

  const denybutton = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton().setCustomId("deny").setLabel("Deny Suggestion").setStyle("DANGER")
  )

  const votebutton = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton().setCustomId("upvote").setLabel("<:icons_upvote:995545071795572758> UpVote").setStyle("SECONDARY"),
    new Discord.MessageButton().setCustomId("downvote").setLabel("<:icons_downvote:995546425704333322> DownVote").setStyle("SECONDARY")
  );
  const downvotebutton = new Discord.MessageActionRow().addComponents(
    new Discord.MessageButton().setCustomId("downvote").setLabel("<:icons_downvote:995546425704333322> DownVote").setStyle("SECONDARY")
  )
  console.log(args) 
    client.channels.cache.get('997638155412975697').send({embeds: [{author:{
      name: 'New Suggestion'
  },color: '#2F3136',timestamp: new Date(),footer:{
      text: `Suggested by ${message.author.tag}`
  },description: `**Suggestion: \`\`\` ${args.join(' ')} \`\`\`**`,fields:[
      {name:"<:icons_upvote:995545071795572758> Up votes:",value:"```\n0```",inline:true},
      {name:"<:icons_downvote:995546425704333322> Down votes:",value:"```\n0```",inline:true},
      {name: `Created`, value: `<t:${Math.trunc(Date.now() / 1000)}:R>`}
  ]}], components: [button]});
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