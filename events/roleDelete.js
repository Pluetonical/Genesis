const Discord = require('discord.js')
const fs = require('fs');


const logger = fs.createWriteStream('log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
const writeLine = (line) => logger.write(`\n${line}`);


module.exports = {
    name: 'roleDelete',
    once: false,
    async execute(role) {
      
        writeLine(`Role Deleted: [ Role Id: ${role.id}, Role: ${role.name}]`)
        role.guild.channels.cache.get('925192125434449980').send({embeds: [{author:{
            name: 'New Role Deleted'
        },color: '#2F3136',timestamp: new Date() ,fields:[
            {name:"Role:",value: `${role.name}`},
            {name:"Role Id:",value: `${role.id}`},
            {name: `Added`, value: `<t:${Math.trunc(Date.now() / 1000)}:R>`}
        ]}]});
      

        
        
    }
}