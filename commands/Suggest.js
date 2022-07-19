const { MessageEmbed } = require("discord.js");
const { DurationFormatter } = require("@sapphire/time-utilities");
const durationFormatter = new DurationFormatter();
const { QuickDB } = require("quick.db");
const db = new QuickDB();

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  const duration = durationFormatter.format(client.uptime);
  const talkedRecently = new Set()
  if (db.has(message.author.id)) {
    message.channel.send("Wait 1 minute before getting typing this again. - " + message.author);
} else {
 console.log('worked')

  



   // the user can type the command ... your command code goes here :)

// Adds the user to the set so that they can't talk for a minute
db.add(message.author.id, 60000);
setTimeout(() => {
  // Removes the user from the set after a minute
  db.set(message.author.id, 0);
}, 60000);
}

  

 
setTimeout(() => {
  // Removes the user from the set after a minute
  talkedRecently.delete(message.author.id);
}, 60000);




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