const Discord = require('discord.js')
const fs = require('fs')

const logger = fs.createWriteStream('log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
const writeLine = (line) => logger.write(`\n${line}`);

module.exports = {
    name: 'messageDelete',
    once: false,
    async execute(messageDelete, client) {
        /**
         * messageDelete.guild.channels.cache.get('925192094220451901').send({embeds: [{author:{
            name: 'New Deleted Message'
        },color: '#2F3136',timestamp: new Date(),footer:{
            text: `Deleted by ${messageDelete.author.tag}`
        },image: messageDelete.stickers.map(sticker => sticker.fetch()) ,fields:[
            {name:"Content:",value: `${messageDelete.stickers.map(sticker => sticker.fetch())}`},
            {name:"Channel:",value: `${messageDelete.channel}`},
            {name: `Created`, value: `<t:${Math.trunc(Date.now() / 1000)}:R>`}
        ]}]}); 
        */

        let userMessage = new Discord.MessageEmbed().setDescription(messageDelete.content || "᲼")
        let messageAttachment =
            messageDelete.attachments.size > 0 ? messageDelete.attachments.first().url : null
        userMessage.setImage(messageAttachment)
        
        let messagePayload = {
            content: null,
            embeds: [],
            stickers: null
        }
        
        messagePayload.content = `User <@${messageDelete.author.id}> said:`
        messagePayload.embeds.push(userMessage)
        messagePayload.stickers = messageDelete.stickers?.size > 0 ? [messageDelete.stickers.first()] : null
     
        messageDelete.guild.channels.cache.get('925192094220451901').send({embeds: [{author:{
            name: 'New Deleted Message'
        },color: '#2F3136',timestamp: new Date(),footer:{
            text: `Deleted by ${messageDelete.author.tag}`
        },image: messageDelete.stickers.map(sticker => sticker.fetch()) ,fields:[
            {name:"Content:",value: `${messageDelete.content}`},
            {name:"Channel:",value: `${messageDelete.channel}`},
            {name: `Created`, value: `<t:${Math.trunc(Date.now() / 1000)}:R>`}
        ]}]});
        
       
        writeLine(`Message Delete: [ Username: "${messageDelete.author.tag}", User Id: "${messageDelete.author.id}", Content: "${messageDelete.content}", Channel: "${messageDelete.channel.id}" ]`)
        

        /**
         * client.users.fetch(messageDelete.author.id, false).then((user) => {
            user.send(messagePayload)
        })
        */
 
       
    }
}




