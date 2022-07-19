exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  if ( message.author.id !== '583772029228941334' ) return message.channel.send("<:icons_outage:995547920587825183> | Only Bot Owners may execute this command!");
  if ( message.author.id !== '817519122895339590') return message.channel.send("<:icons_outage:995547920587825183> | Only Bot Owners may execute this command!");
  await message.reply("<:icons_Correct:995546257923768380> | Shutting down...");
  await Promise.all(client.container.commands.map(cmd => {
    delete require.cache[require.resolve(`./${cmd.help.name}.js`)];
    client.container.commands.delete(cmd.help.name);
  }));
  process.exit(0);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sd"],
  permLevel: 5
};

exports.help = {
  name: "shutdown",
  category: "System",
  description: "Shuts Down The Bot \n\n**Note:** This command can only be used by the **Bot Developers**",
  usage: "shutdown"
};
