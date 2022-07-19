const Discord = require("discord.js");
const config = require("../config.js");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message) {
    if (message.author.bot) return;
    if (message.channel.id !== '997002367016914994' || message.channel.isThread() == true) return;

    message.delete();
    message.channel.send("<:icons_Correct:995546257923768380> | Thank you! Your suggestion has been successfully recorded and forwarded to the development team.").then(msg => { setTimeout(() => { msg.delete(); }, 10000); });
        
    const button = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton().setCustomId("accept_suggestion").setLabel("Accept").setStyle("SUCCESS"),
      new Discord.MessageButton().setCustomId("deny_suggestion").setLabel("Deny").setStyle("DANGER")
    );
    message.guild.channels.cache.get('997002423468052480').send({ embeds: [new Discord.MessageEmbed().setColor(0xffcd00).setTitle("<:icons_folder:995548354530517142> New Suggestion").setDescription(`**Suggested by ${message.author.tag}**\n\n**Content:**\n${message.content}\n\n**Status:** -`).setFooter(message.author.id)], components: [button] });
  }
};