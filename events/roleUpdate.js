const Discord = require('discord.js')
const fs = require('fs');


const logger = fs.createWriteStream('log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
const writeLine = (line) => logger.write(`\n${line}`);


module.exports = {
    name: 'roleUpdate',
    once: false,
    async execute(oldRole, newRole) {
      
        writeLine(`Role Edited: [ Old Role Id: ${oldRole.id}, Old Role: ${oldRole.name}, New Role Id: ${newRole.id}, New Role: ${newRole.name}]`)
        role.guild.channels.cache.get('925192125434449980').send({embeds: [{author:{
            name: 'New Role Edited'
        },color: '#2F3136',timestamp: new Date() ,fields:[
            {name:"Old Role Id:",value: `${oldRole.id}`},
            {name:"Old Role:",value: `${oldRole.name}`},
            {name:"New Role Id:",value: `${newRole.id}`},
            {name:"New Role:",value: `${newRole.name}`},
            {name: `Added`, value: `<t:${Math.trunc(Date.now() / 1000)}:R>`}
        ]}]});
      

        
        
    }
}