 const extraMysqlCredentials = {
    host: 'db.bit.io',
    user: 'Bulkmrslasher',
    password: 'v2_3sdm2_vVfgZfx5wjL86aVLL3AFVjs',
    database: 'Bulkmrslasher/genesis'
}

//export const permLevels = ["Bot Owner","Bot Dev", "Staff", "User"]
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
    level: 2

},
]

 const partials = ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_SCHEDULED_EVENT', 'GUILD_MEMBER', 'USER', 'CHANNEL']
const { Client, Intents } = require('discord.js');
const intents = [Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_MESSAGES]
const Guild = '994810515446575177'
const channel = [{
    rankSyncChannel: '996156218282356777'
}]
