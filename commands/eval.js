const Discord = require("discord.js");
const config = require("../config.js");

async function clean(client, text) {
  if (text && text.constructor.name == "Promise")
    text = await text;
  if (typeof text !== "string")
    text = require("util").inspect(text, { depth: 1 });

  text = text
    .replace(/`/g, "`" + String.fromCharCode(8203))
    .replace(/@/g, "@" + String.fromCharCode(8203));


  text = text.replaceAll(client.token, "[REDACTED]");

  return text;
}

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if ( message.author.id !== '583772029228941334') return message.channel.send("<:icons_outage:995547920587825183> | Only Bot Owners may execute this command!");
  message.delete()

  const code = args.join(" ");
  const evaled = eval(code);
  const cleaned = await clean(client, evaled);
  const embed = new Discord.MessageEmbed()
    .setTitle("Eval Job")
    .setColor("#2F3136")
    .setDescription("**Output** -\n```js\n" + cleaned + "\n```")
    .setTimestamp();

  message.reply({ embeds: [embed] });
  client.channels.cache.get('997002415628898364').send(`${message.author.tag} ran the eval command with the following code: \`\`\`js\n${code}\n\`\`\``);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates Javascript Code & Executes Tt \n\n**Note:** This feature is only usuable by the bot developers",
  usage: "eval [code]"
};