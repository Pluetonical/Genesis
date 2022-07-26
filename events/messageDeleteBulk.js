const Discord = require('discord.js')
const fs = require('fs');
const messageDelete = require('./messageDelete');


const logger = fs.createWriteStream('log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
const writeLine = (line) => logger.write(`\n${line}`);


module.exports = {
    name: 'messageDeleteBulk',
    once: false,
    async execute(messages, Message) {
      
        
        const messagelist = messages.map(message => `Message Purge: [ Username: "${message.author.tag}", User Id: "${message.author.id}", Content: "${message.content}", Channel: "${message.channel.id}" ]`)
        messagelist.forEach(m => {
            writeLine(`${m}`)
        })

        
        
    }
}