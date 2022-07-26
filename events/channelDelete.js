const Discord = require('discord.js')


module.exports = {
    name: 'channelDelete',
    once: false,
    async execute(channel) {

        console.log(channel)
        channel.guild.channels.cache.get('925192280267178004').send({embeds: [{author:{
            name: 'Channel Deleted'
        },color: '#2F3136',timestamp: new Date(),fields:[
            {name:"Channel name:",value: `${channel.name}`},
            {name:"Channel id:",value: `${channel.id}`},
            {name: `Deleted`, value: `<t:${Math.trunc(Date.now() / 1000)}:R>`}
        ]}]});
    }
}