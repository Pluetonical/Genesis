import { Client, Collection } from "discord.js";
import { readdirSync } from "fs";
import { intents, partials, permLevels } from "./config.js";
import { log } from "./modules/logger.js";
import dotenv from 'dotenv';
const client = new Client({ intents, partials });

const commands = new Collection();
const aliases = new Collection();

const levelCache = {};
for (let i = 0; i < permLevels.length; i++) {
  const thisLevel = permLevels[i];
  levelCache[thisLevel.name] = thisLevel.level;
}

client.container = {
  commands,
  aliases,
  levelCache
};

const init = async () => {
  const commands = readdirSync("./commands/").filter(file => file.endsWith(".js"));
  for (const file of commands) {
    const props = require(`./commands/${file}`);
    log(`Loading command: ${props.help.name}...`, "log");
    client.container.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.container.aliases.set(alias, props.help.name);
    });
  }

  const eventFiles = readdirSync("./events").filter(file => file.endsWith(".js"));
  for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
      log(`Loading event: ${file}...`, "log");
    }
  }

  ticketOpenCooldown = [];

  client.on("threadCreate", (thread) => thread.join());

  client.login(process.env.TOKEN);
};

init();