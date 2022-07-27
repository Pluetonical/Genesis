// Require the necessary discord.js classes
const { Client, Intents, Collection } = require('discord.js');
const logger = require('./modules/Logger.js')
const { readdirSync } = require("fs");
const EventEmitter = require('events');


const permLevels = [{
  name: 'Bot Owner',
  level: 5

},
{
  name: 'Bot Dev',
  level: 4

},{
  name: 'Staff',
  level: 3

},{
  name: 'User',
  level: 0

},
]
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_MEMBERS], partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_SCHEDULED_EVENT', 'GUILD_MEMBER', 'USER', 'CHANNEL'] });
//const commands = new Collection();


const levelCache = {};
for (let i = 0; i < permLevels; i++) {
  const thisLevel = permLevels[i];
  levelCache[thisLevel.name] = thisLevel.level;
}
const commands = new Collection()
const aliases = new Collection()
client.container = {
  commands,
  aliases,
  levelCache
};
// When the client is ready, run this code (only once)
const init = async () => {
  const commands = readdirSync("./commands/").filter(file => file.endsWith(".js"));
  for (const file of commands) {
    const props = require(`./commands/${file}`);
    console.log(`Loading command: ${props.help.name}...`, "log");
    client.container.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.container.aliases.set(alias, props.help.name);
    });
  }

  const eventFiles = readdirSync("./events").filter(file => file.endsWith(".js"));
  EventEmitter.setMaxListeners(100)
  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
      console.log(`Loading event: ${file}...`, "log");
    }
  }

  ticketOpenCooldown = [];

  client.on("threadCreate", (thread) => thread.join());
  client.login('OTk1OTE4MTYzMTM5MTEzMDAx.GsCAl1.9FPVS9-f4wvxLu1l2aIdIAthdf098L5NFRNEgs');
};
init()
// Login to Discord with your client's token
