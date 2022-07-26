const Discord = require("discord.js");
const config = require("../config.js");

module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    if (message.author.bot) return;
    if (message.channel.id !== '969746835595993138') return;

    message.delete();
        
    const button = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton().setCustomId("accept_bug_report").setLabel("Accept").setStyle("SUCCESS"),
      new Discord.MessageButton().setCustomId("deny_bug_report").setLabel("Deny").setStyle("DANGER")
    );

    message.channel.send("<:icons_activities:995546445618884659> | Thank you! Your bug report has been successfully recorded!").then(msg => { setTimeout(() => { msg.delete(); }, 10000); });
    client.channels.cache.get('969746835595993138').send({ embeds: [new Discord.MessageEmbed().setTitle("<:icons_pin:995545853378965554> New Bug Report").setColor('#2F3136').setDescription(`**Submitted by:** <@!${message.author.id}> | ${message.author.tag}\n\n**Message:**\n\`\`\`${message.content}\`\`\`\n\n`).setFooter(`${message.author.id} | ${message.attachments.map(attachment => attachment.url)}`)], components: [button] }).then(msg => {
      
      if (message.attachments.size > 0) {
        msg.reply({ "content": "Evidence:", "files": message.attachments.map(attachment => attachment.url) });
      } else  {
        const matches = message.content.match(/\bhttps?:\/\/\S+/gi);
        msg.reply({ "content": `Evidence: ${matches?.toString()}` });
      }
    });
  }
};

