const { Guild } = require("discord.js");
const { getSettings} = require("../modules/functions.js");
const permLevels = [{
  name: 'Bot Owner',
  level: 5,
  guildOnly: true

},
{
  name: 'Bot Dev',
  level: 4,
  guildOnly: true

},{
  name: 'Staff',
  level: 3,
  guildOnly: true
},{
  name: 'User',
  level: 0,
  guildOnly: false

},
]
function permlevel(message) {
  let permlvl = 0;
  const permOrder = permLevels.slice(0).sort((p, c) => p.level < c.level ? 1 : -1);

  while (permOrder.length) {
    const currentLevel = permOrder.shift();
    if (message.guild && currentLevel.guildOnly) continue;
    if (currentLevel) {
      permlvl = currentLevel.level;
      break;
    }
  }
  return permlvl;
}
module.exports = {
  name: "messageCreate",
  once: false,
  async execute(message, client) {
    const { container } = client;

    const prefix = '!'

    const prefixMention = new RegExp(`^<@!?${client.user.id}> ?$`);
    if (message.content.match(prefixMention)) {
      return message.reply(`My prefix is \`${prefix}\` :slight_smile:`);
    }

    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.channel.id == "874578247680147466" || message.channel.id == "955656331891728434" || message.channel.id == "949694589453893722" || message.channel.id == "874578842239520818" || message.channel.id == "887466836659171338" || message.channel.id == "884748533226410035" || message.channel.id == "874580767626395648" || message.channel.id == "874579499692466207" || message.channel.id == "874580203576373288" || message.channel.id == "882572092611112970" || message.channel.id == "966594284696514630" || message.channel.id == "967709254955966474" || message.channel.id == "967611150529343498") return;

    if (message.guild && !message.member) await message.guild.members.fetch(message.author);

    const level = permlevel(message);
    const cmd = container.commands.get(command) || container.commands.get(container.aliases.get(command));

    if (!cmd) return;

    if (cmd && cmd.conf.guildOnly && message.guild.id != '925160468476207114') 
    return message.channel.send(" Please run this command in Genesis Network instead - discord.gg/cosmicpe");
    //bot role id = 990796816222150708
   

    const ecmd = message.content.substring(1, 4)
    const scmd = message.content.substring(1, 8)
    const sscmd = message.content.substring(1, 2)
    if (message.content.search('eval') === true && message.author.id != '583772029228941334' )
      return message.channel.send(":lock: **Only the bot Owners may run this command!**"); 
    
    //if (args[0] = 'eval' && message.author.id != '583772029228941334' || message.author.id != '817519122895339590') 
     // return message.channel.send(":lock: **Only the bot Owners may run this command!**"); 

    if (!cmd.conf.enabled) return;

    if (level < container.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice === "true") {
        return message.channel.send(`<:cross:883326239341965332> | You do not have permission to use this command.\n\nRequired permission level: \`${container.levelCache[cmd.conf.permLevel]}\``);
      } else {
        return;
      }
    }

    message.author.permLevel = level;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
    try {
      await cmd.run(client, message, args, level);
    } catch (e) {
      console.error(e);
      message.channel.send({ content: `An error occurred while processing your request - please ping a developer if the issue continues.\n\n\`\`\`${e.message}\`\`\`` })
        .catch(e => console.error("An error occurred:", e));
    }
  }
};