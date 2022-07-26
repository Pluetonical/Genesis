const Discord = require("discord.js");
const config = require("../config.js");
const request = require("request");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    request.get({
        url: "https://api.mcsrvstat.us/bedrock/2/play.genesispe.org:19132",
        json: true,
        headers: { "User-Agent": "request" }
      }, (err, res, data) => {
        if (err) {
          console.log("Error:", err);
        } else if (res.statusCode !== 200) {
          console.log("Status:", res.statusCode);
        } else {
          if (data.online === true) {
            const playersOnline = data.players.online;
            console.log('online')
            const status = `${playersOnline} players online on Genesis`;
            let date = new Date()
            const embed = new Discord.MessageEmbed()
                .setColor("#2F3136")
                .setTitle("Genesis - Server Status")
                .setDescription("Here are the current Genesis Factions server Stats!")
                .addField(`Server Status:`, `**Online**`)
                .addField(`Player's Online: `, `**${playersOnline}**`)
                .addField(`IP: `, 'play.genesispe.org', true)
                .addField(`Port: `, '19132', true)
                .setFooter(`Command requested by ${message.author.tag}`, message.author.displayAvatarURL());

            
                message.reply({ embeds: [embed] });
            
          } else {
            const playersOnline = data.players.online;
            const status = `${playersOnline} players online on Genesis`;
            

            
            
            
          }
        }
        
      });

      
    

  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "status",
  category: "Basic",
  description: "Get Status about the ingame server",
  usage: "status"
};