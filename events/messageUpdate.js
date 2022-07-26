const Discord = require('discord.js')
module.exports = {
    name: 'messageUpdate',
    once: false,
    async execute(oldMessage, newMessage) {
        

        newMessage.guild.channels.cache.get('925192094220451901').send({embeds: [{author:{
            name: 'New Edited Message'
        },color: '#2F3136',timestamp: new Date(),footer:{
            text: `Deleted by ${newMessage.author.tag}`
        } ,fields:[
            {name:"Old Message:",value: `${oldMessage.content}`},
            {name:"New Message:",value: `${newMessage.content}`},
            {name:"Channel:",value: `${newMessage.channel}`},
            {name: `Created`, value: `<t:${Math.trunc(Date.now() / 1000)}:R>`}
        ]}]});

        
    }
}
