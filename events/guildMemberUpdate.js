const config = require("../config.js");
const mysql = require("mysql");
const Discord = require('discord.js');
const { TimerManager } = require("@sapphire/time-utilities");
const fs = require('fs');


const logger = fs.createWriteStream('log.txt', {
    flags: 'a' // 'a' means appending (old data will be preserved)
  })
const writeLine = (line) => logger.write(`\n${line}`);


module.exports = {
  name: "guildMemberUpdate",
  once: false,
  async execute(oldMember, newMember) {
    const oldRoles = await oldMember.roles.cache
    const newRoles = await newMember.roles.cache
   
    for (let role of newRoles) {
      if (!oldRoles.has(role[0])) {
      newMember.guild.channels.cache.get('925192125434449980').send({embeds: [{author:{
        name: 'New Role Added'
    },color: '#2F3136',timestamp: new Date() ,fields:[
        {name:"Role:",value: `${role[1]}`},
        {name:"User:",value: `${newMember}`},
        {name: `Added`, value: `<t:${Math.trunc(Date.now() / 1000)}:R>`}
    ]}]});
    writeLine(`Role added: [Username: ${newMember.tag}, UserID: ${newMember.id}, Role: ${role[0]}]`)
  }
     
    }

    for (let role of oldRoles) {
      if (!newRoles.has(role[0])) {
      newMember.guild.channels.cache.get('925192125434449980').send({embeds: [{author:{
        name: 'New Role Removed'
    },color: '#2F3136',timestamp: new Date() ,fields:[
        {name:"Role:",value: `${role[1]}`},
        {name:"User:",value: `${newMember}`},
        {name: `Removed`, value: `<t:${Math.trunc(Date.now() / 1000)}:R>`}
    ]}]});
    writeLine(`Role removed: [Username: ${newMember.tag}, UserID: ${newMember.id}, Role: ${role[0]}]`)
  }
     
    }
    

    
    }

};

