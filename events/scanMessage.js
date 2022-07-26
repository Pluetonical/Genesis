const { MessageEmbed } = require("discord.js");
const config = require("../config.js");

//Ping Juan if issues with this file
module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.author.bot) return;
    if (message.channel.id == '997002358657667112' || message.channel.id == '997002359609753601' || message.channel.id == '997002367016914994') return;
        
    const ipMessage = ["?", "port", "ip"];
    const disconnectedMessage = ["disconnected"];
    const uaMessage = ["java", "java.utl.concurrent.timeoutexception"];
    const rankMessage = ["rank"];
    const reportMessage = ["hacking"];
        
    const MIN_REQUIRED_CONFIDENCE = {
      ip: 60,
      ua: 40,
      dc: 50,
      hax: 70
    };
    const confidence = {
      ip: 0,
      dc: 0,
      ua: 0,
      hax: 0
    };

    for (var i = 0; i < ipMessage.length; i++) {
      for (var x = 0; x < message.content.split(" ").length; x++) {
        if (ipMessage[i].toLowerCase() == message.content.split(" ")[x].toLowerCase()) {
          confidence.ip = confidence.ip + Math.floor(100 / ipMessage.length);
        }
      }
    }

    for (var a = 0; a < disconnectedMessage.length; a++) {
      for (var b = 0; b < message.content.split(" ").length; b++) {
        if (disconnectedMessage[a].toLowerCase() == message.content.split(" ")[b].toLowerCase()) {
          if (message.content.toLowerCase().includes(disconnectedMessage[a].toLowerCase())) {
            confidence.dc = confidence.dc + Math.floor(100 / disconnectedMessage.length);
          }
        }
      }
    }
        
    for (var c = 0; c < uaMessage.length; c++) {
      for (var d = 0; d < message.content.split(" ").length; d++) {
        if (uaMessage[c].toLowerCase() == message.content.split(" ")[d].toLowerCase()) {
          if (message.content.toLowerCase().includes(uaMessage[c].toLowerCase())) {
            confidence.ua = confidence.ua + Math.floor(100 / uaMessage.length);
          }
        }
      }
    }

    for (var g = 0; g < reportMessage.length; g++) {
      if (message.content.toLowerCase().includes(reportMessage[g].toLowerCase())) {
        confidence.hax = confidence.hax + Math.floor(100 / reportMessage.length);
      }
    }

    if (message.channel.id == '997002375162253382') {
      for (var h = 0; h < rankMessage.length; h++) {
        for (var r = 0; r < message.content.split(" ").length; r++) {
          if (rankMessage[h].toLowerCase() == message.content.split(" ")[r].toLowerCase()) {
            const rankEmbed = new MessageEmbed()
              .setTitle("Claim your rank!")
              .setColor("#2F3136")
              .setDescription("Please check [this message](https://discord.com/channels/994810515446575177/996156218282356777) to learn how to claim your rank.")
              .setTimestamp();
            message.channel.send({ embeds: [rankEmbed] });
            break;
          }
        }
      }
    }

    const embeds = [];

    confidence.ip = confidence.ip > 95 ? 100 : confidence.ip;
    confidence.ua = confidence.ua > 95 ? 100 : confidence.ua;
    confidence.dc = confidence.dc > 95 ? 100 : confidence.dc;
    confidence.hax = confidence.hax > 95 ? 100 : confidence.hax;
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }
    
    if (confidence.ip > MIN_REQUIRED_CONFIDENCE.ip) {
      embeds.push(new MessageEmbed()
        .setTitle("IP & Port")
        .setColor("#2F3136")
        .setDescription("Here's the IP and port you can use to join the Genesis Network:\n\n**IP** - play.genesispe.org\n**Port** - 19132 (Default)\n**Version** - 1.18.2")
        .setFooter(`Confidence: ${confidence.ip + getRandomInt(34)}% - React if this was helpful`)); 
    }
        
    if (confidence.ua > MIN_REQUIRED_CONFIDENCE.ua) {
      embeds.push(new MessageEmbed()
        .setTitle("Getting kicked for \"java.utl.concurrent.timeoutexception\"?")
        .setColor("#2F3136")
        .setDescription("This occurs when the server is usually offline. The server may appear offline but isn't. You may use !status to check the ingame server.")
        .setFooter(`Confidence: ${confidence.ua}% - React if this was helpful`));
    }
        
    if (confidence.dc > MIN_REQUIRED_CONFIDENCE.dc) {
      embeds.push(new MessageEmbed()
        .setTitle("Getting constantly disconnected?")
        .setColor("#2F3136")
        .setDescription("This may occur for a multilitude of reasons, new features are being added, bug may have been found, or server is restarting.")
        .setFooter(`Confidence: ${confidence.dc}% - React if this was helpful`));
    }
        
    if (confidence.hax > MIN_REQUIRED_CONFIDENCE.hax) {
      embeds.push(new MessageEmbed()
        .setTitle("Found a player breaking Genesis's rules?")
        .setColor("#2F3136")
        .setDescription("Please head over to <#925165041014149140> and open a support ticket. Make sure to give any information you can so staff can help!")
        .setFooter(`Confidence: ${confidence.hax}% - React if this was helpful`));
    }
        
    if (embeds.length > 0) {
      await message.channel.send({ content: `<@${message.author.id}>`, embeds: embeds }).then((message) => {
        message.react("<:icons_Correct:995546257923768380>").then(() => {
          message.react("<:icons_Wrong:995545123142254612>");
        });
      });
    }
  }
};