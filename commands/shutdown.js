exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
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
