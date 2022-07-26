/* eslint no-undef: 0 */
const Discord = require("discord.js");
const config = require("../config.js");
const fs = require("fs");
const mysql = require("mysql");
const { createTranscript } = require("discord-html-transcripts");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction, client) {
    function roughScale(x, base) {
      const parsed = parseInt(x, base);

      if (isNaN(parsed)) { return 0; }
      return parsed;
    }

  

    const button = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton().setCustomId("close_ticket").setLabel("Close Ticket").setStyle("DANGER")
    );
    const claim = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton().setCustomId("claim_ticket").setLabel("Claim").setStyle("SUCCESS")
    );
    const claimed = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton().setCustomId("claim_ticket").setLabel("Claim").setStyle("SUCCESS").setDisabled(true)
    );

    const row = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu()
      .setCustomId("ticketselection")
      .setPlaceholder("Select an Option (1-5)")
      .setMaxValues(1)
      .addOptions([{
        label: "Support",
        description: "Get assistance from our staff members.",
        value: "support",
        emoji: "<:icons_supportteam:995549260743454832>"
      },
      {
        label: "Appeal",
        description: "Appeal your ban/mute.",
        value: "appeal",
        emoji: "<:icons_hammer:995545300552917013>"
      },
      {
        label: "Giveaway Prize",
        description: "Claim the item you won from a giveaway.",
        value: "giveaway",
        emoji: "5️<:icons_tada:995551400849313815>"
      },
      {
        label: "Store",
        description: "Claim an item you purchased.",
        value: "store",
        emoji: "6️<:icons_paypal:995545769488683128>"
      },
      {
        label: "Partnership",
        description: "Apply for Genesis partnership.",
        value: "partnership",
        emoji: "7️<:icons_partner:995549092908380200>"
      },
      
      
      ])
    );

    const embed = new Discord.MessageEmbed()
      .setTitle("Create Ticket")
      .setColor("#2F3136")
      .setThumbnail(config.logo)
      .setDescription("**OPEN A TICKET TO:**\n<:icons_Correct:995546257923768380> Recieve Support From Staff\n<:icons_Correct:995546257923768380> Apply for Partnership\n<:icons_Correct:995546257923768380> Appeal a punishment\n<:icons_Correct:995546257923768380> Claim a Giveaway \n\n__**DONT**__ **OPEN A TICKET FOR:**\n<:icons_Wrong:995545123142254612> Ask about your application\n<:icons_Wrong:995545123142254612> Ask for permissions\n<:icons_Wrong:995545123142254612> Annoy staff members\n\nMake sure to fill out any information you can when opening a ticket.");
      
    

    if (interaction.isSelectMenu()) {
      if (interaction.values[0] === "support") {
        if ((Date.now() - (ticketOpenCooldown[interaction.user.id] ? ticketOpenCooldown[interaction.user.id] : 0)) <= 10 * 60 * 1000) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You need to wait 10 minutes until you can open another ticket!")], ephemeral: true });
        ticketOpenCooldown[interaction.user.id] = Date.now();

        fs.readFile("ticketno.txt", function(err, data) {
          if (err) return console.error(err);

          const x = data.toString().split(" ").slice(-1).toString();
          const no = parseInt(x) + 1;

          Number.prototype.pad = function(size) {
            let s = String(this);

            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
          };

          fs.writeFile("ticketno.txt", `Ticket Number: ${(no)}`, function(err) { if (err) console.log(err); });

          interaction.guild.channels.create(`support-${(no).pad(4)}`, {
            parent: "998719310983872632",
            type: "text",
            permissionOverwrites: [{
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: interaction.user.id
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925165680184164352'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '990796816222150708'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168758501306379' //trainee
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168660849491998' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168551596286042' //mod
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925166762650116096'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '940333451998031913'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925166842291568660' // management
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '943901471282450452' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925171656022949968' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168258628321351' 
            }
            ]
          }).then(channel => {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription(`\`<:icons_Correct:995546257923768380>\` Ticket <#${channel.id}> has been opened`)], ephemeral: true }); //#2F3136
            interaction.message.edit({ embeds: [embed], components: [row] });
            client.channels.cache.get('998720984846700664').send({ content: `<#${channel.id}>`, embeds: [new Discord.MessageEmbed().setTitle("<:icons_folder:995548354530517142> New Ticket").setColor("#2F3136").setDescription(`**Opened by:** ${interaction.user.tag}\n**Ticket:** support-${(no).pad(4)}\n**Status:** <:icons_Wrong:995545123142254612> Unclaimed`).setFooter(channel.id).setTimestamp()], components: [claim] });
            channel.send({ content: `<@${interaction.user.id}>` }).then(sent => sent.delete());
            channel.send({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setTitle("**__SUPPORT__**").setDescription("Please describe your issue/query here, a staff member will be with you shortly.").setFooter(`Ticket opened by ${interaction.user.tag} | ${interaction.user.id}`).setTimestamp()], components: [button] });
          });
        });
      }

      /*if (interaction.values[0] === "smp") {
        if ((Date.now() - (ticketOpenCooldown[interaction.user.id] ? ticketOpenCooldown[interaction.user.id] : 0)) <= 10 * 60 * 1000) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You need to wait 10 minutes until you can open another ticket!")], ephemeral: true });
        ticketOpenCooldown[interaction.user.id] = Date.now();

        fs.readFile("ticketno.txt", function(err, data) {
          if (err) return console.error(err);

          const x = data.toString().split(" ").slice(-1).toString();
          const no = parseInt(x) + 1;

          Number.prototype.pad = function(size) {
            let s = String(this);

            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
          };

          fs.writeFile("ticketno.txt", `Ticket Number: ${(no)}`, function(err) { if (err) console.log(err); });

          interaction.guild.channels.create(`smp-${(no).pad(4)}`, {
            parent: "966646740977610802",
            type: "text",
            permissionOverwrites: [{
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: interaction.user.id
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '997002182350094396'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '997002181116964905'
            }
            ]
          }).then(channel => {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription(`\`✅\` Ticket <#${channel.id}> has been opened`)], ephemeral: true });
            interaction.message.edit({ embeds: [embed], components: [row] });
            client.channels.cache.get('997002387334119444').send({ content: `<#${channel.id}>`, embeds: [new Discord.MessageEmbed().setTitle("<:atlanta_folder:601019084468912129> New Ticket").setColor(0xffcd00).setDescription(`**Opened by:** ${interaction.user.tag}\n**Ticket:** smp-${(no).pad(4)}\n**Status:** ❌ Unclaimed`).setFooter(channel.id).setTimestamp()], components: [claim] });
            channel.send({ content: `<@${interaction.user.id}>` }).then(sent => sent.delete());
            channel.send({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setTitle("**__SUPPORT__**").setDescription("Please describe your issue/query here, a staff member will be with you shortly.").setFooter(`Ticket opened by ${interaction.user.tag} | ${interaction.user.id}`).setTimestamp()], components: [button] });
          });
        });
      }
      **/
      if (interaction.values[0] === "appeal") {
        if ((Date.now() - (ticketOpenCooldown[interaction.user.id] ? ticketOpenCooldown[interaction.user.id] : 0)) <= 10 * 60 * 1000) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You need to wait 10 minutes until you can open another ticket!")], ephemeral: true });
        ticketOpenCooldown[interaction.user.id] = Date.now();

        fs.readFile("ticketno.txt", function(err, data) {
          if (err) return console.error(err);

          const x = data.toString().split(" ").slice(-1).toString();
          const no = parseInt(x) + 1;

          Number.prototype.pad = function(size) {
            let s = String(this);

            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
          };

          fs.writeFile("ticketno.txt", `Ticket Number: ${(no)}`, function(err) { if (err) console.log(err); });

          interaction.guild.channels.create(`appeal-${(no).pad(4)}`, {
            parent: "998719310983872632",
            type: "text",
            permissionOverwrites: [{
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: interaction.user.id
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925165680184164352'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '990796816222150708'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168758501306379' //trainee
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168660849491998' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168551596286042' //mod
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925166762650116096'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '940333451998031913'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925166842291568660' // management
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '943901471282450452' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925171656022949968' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168258628321351' 
            }
            ]
          }).then(channel => {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription(`\`<:icons_Correct:995546257923768380>\` Ticket <#${channel.id}> has been opened`)], ephemeral: true });
            interaction.message.edit({ embeds: [embed], components: [row] });
            client.channels.cache.get('998720984846700664').send({ content: `<#${channel.id}>`, embeds: [new Discord.MessageEmbed().setTitle("<:icons_folder:995548354530517142> New Ticket").setColor("#2F3136").setDescription(`**Opened by:** ${interaction.user.tag}\n**Ticket:** appeal-${(no).pad(4)}\n**Status:** <:icons_Wrong:995545123142254612> Unclaimed`).setFooter(channel.id).setTimestamp()], components: [claim] });
            channel.send({ content: `<@${interaction.user.id}>` }).then(sent => sent.delete());
            channel.send({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setTitle("**__PUNISHMENT APPEAL__**").setDescription("You may make an appeal / apology here. Please remain patient until a staff member reviews your appeal, If you think you were innocent please provide us with some evidence of you proving so.").setFooter(`Ticket opened by ${interaction.user.tag} | ${interaction.user.id}`).setTimestamp()], components: [button] });
          });
        });
      }
      /*
      if (interaction.values[0] === "builder") {
        if ((Date.now() - (ticketOpenCooldown[interaction.user.id] ? ticketOpenCooldown[interaction.user.id] : 0)) <= 10 * 60 * 1000) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You need to wait 10 minutes until you can open another ticket!")], ephemeral: true });
        ticketOpenCooldown[interaction.user.id] = Date.now();

        fs.readFile("ticketno.txt", function(err, data) {
          if (err) return console.error(err);

          const x = data.toString().split(" ").slice(-1).toString();
          const no = parseInt(x) + 1;

          Number.prototype.pad = function(size) {
            let s = String(this);

            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
          };

          fs.writeFile("ticketno.txt", `Ticket Number: ${(no)}`, function(err) { if (err) console.log(err); });

          interaction.guild.channels.create(`builder-${(no).pad(4)}`, {
            parent: "959800428378325102",
            type: "text",
            permissionOverwrites: [{
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: interaction.user.id
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: "909424871451271198"
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: "878534647888359445"
            }
            ]
          }).then(channel => {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription(`\`✅\` Ticket <#${channel.id}> has been opened`)], ephemeral: true });
            interaction.message.edit({ embeds: [embed], components: [row] });
            channel.send({ content: `<@${interaction.user.id}>` }).then(sent => sent.delete());
            channel.send({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setTitle("**__BUILDER APPLICATION__**").setDescription("Please be patient, a head builder will be with you shortly.").setFooter(`Ticket opened by ${interaction.user.tag} | ${interaction.user.id}`).setTimestamp()], components: [button] });
          });
        });
      }
      
      if (interaction.values[0] === "famous") {
        if ((Date.now() - (ticketOpenCooldown[interaction.user.id] ? ticketOpenCooldown[interaction.user.id] : 0)) <= 10 * 60 * 1000) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You need to wait 10 minutes until you can open another ticket!")], ephemeral: true });
        ticketOpenCooldown[interaction.user.id] = Date.now();

        fs.readFile("ticketno.txt", function(err, data) {
          if (err) return console.error(err);

          const x = data.toString().split(" ").slice(-1).toString();
          const no = parseInt(x) + 1;

          Number.prototype.pad = function(size) {
            let s = String(this);

            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
          };

          fs.writeFile("ticketno.txt", `Ticket Number: ${(no)}`, function(err) { if (err) console.log(err); });

          interaction.guild.channels.create(`famous-${(no).pad(4)}`, {
            parent: "959791313954406480",
            type: "text",
            permissionOverwrites: [{
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: interaction.user.id
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '997002182350094396'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '997002181116964905'
            }
            ]
          }).then(channel => {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription(`\`✅\` Ticket <#${channel.id}> has been opened`)], ephemeral: true });
            interaction.message.edit({ embeds: [embed], components: [row] });
            client.channels.cache.get('997002387334119444').send({ content: `<#${channel.id}>`, embeds: [new Discord.MessageEmbed().setTitle("<:atlanta_folder:601019084468912129> New Ticket").setColor(0xffcd00).setDescription(`**Opened by:** ${interaction.user.tag}\n**Ticket:** famous-${(no).pad(4)}\n**Status:** ❌ Unclaimed`).setFooter(channel.id).setTimestamp()], components: [claim] });
            channel.send({ content: `<@${interaction.user.id}>` }).then(sent => sent.delete());
            channel.send({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setTitle("**__MEDIA+ RANK APPLICATION__**").setDescription("Please send us your genesis-exclusive video and please be patient while a staff member checks your application, please make sure you meet the following requirements:\n\n• 1,500 subscribers\n• 1000 views in your last 5 videos\n• A video on genesis every 5 months\n• Must not have hacking related content").setFooter(`Ticket opened by ${interaction.user.tag} | ${interaction.user.id}`).setTimestamp()], components: [button] });
          });
        });
      }

      if (interaction.values[0] === "media") {
        if ((Date.now() - (ticketOpenCooldown[interaction.user.id] ? ticketOpenCooldown[interaction.user.id] : 0)) <= 10 * 60 * 1000) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You need to wait 10 minutes until you can open another ticket!")], ephemeral: true });
        ticketOpenCooldown[interaction.user.id] = Date.now();

        fs.readFile("ticketno.txt", function(err, data) {
          if (err) return console.error(err);

          const x = data.toString().split(" ").slice(-1).toString();
          const no = parseInt(x) + 1;

          Number.prototype.pad = function(size) {
            let s = String(this);
            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
          };

          fs.writeFile("ticketno.txt", `Ticket Number: ${(no)}`, function(err) { if (err) console.log(err); });

          interaction.guild.channels.create(`media-${(no).pad(4)}`, {
            parent: "959791313954406480",
            type: "text",
            permissionOverwrites: [{
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: interaction.user.id
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '997002182350094396'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '997002181116964905'
            }
            ]
          }).then(channel => {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription(`\`✅\` Ticket <#${channel.id}> has been opened`)], ephemeral: true });
            interaction.message.edit({ embeds: [embed], components: [row] });
            client.channels.cache.get('997002387334119444').send({ content: `<#${channel.id}>`, embeds: [new Discord.MessageEmbed().setTitle("<:atlanta_folder:601019084468912129> New Ticket").setColor(0xffcd00).setDescription(`**Opened by:** ${interaction.user.tag}\n**Ticket:** media-${(no).pad(4)}\n**Status:** ❌ Unclaimed`).setFooter(channel.id).setTimestamp()], components: [claim] });
            channel.send({ content: `<@${interaction.user.id}>` }).then(sent => sent.delete());
            channel.send({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setTitle("**__MEDIA RANK APPLICATION__**").setDescription("Please send us your genesis-exclusive video and please be patient while a staff member checks your application, please make sure you meet the following requirements:\n\n• 800 subscribers\n• 300 views in your last 5 videos\n• A video on Genesis every 3 months\n• Must not have hacking related content").setFooter(`Ticket opened by ${interaction.user.tag} | ${interaction.user.id}`).setTimestamp()], components: [button] });
          });
        });
      }
      **/

      if (interaction.values[0] === "giveaway") {
        if ((Date.now() - (ticketOpenCooldown[interaction.user.id] ? ticketOpenCooldown[interaction.user.id] : 0)) <= 10 * 60 * 1000) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You need to wait 10 minutes until you can open another ticket!")], ephemeral: true });
        ticketOpenCooldown[interaction.user.id] = Date.now();

        fs.readFile("ticketno.txt", function(err, data) {
          if (err) return console.error(err);

          const x = data.toString().split(" ").slice(-1).toString();
          const no = parseInt(x) + 1;

          Number.prototype.pad = function(size) {
            let s = String(this);

            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
          };

          fs.writeFile("ticketno.txt", `Ticket Number: ${(no)}`, function(err) { if (err) console.log(err); });

          interaction.guild.channels.create(`giveaway-${(no).pad(4)}`, {
            parent: "998719310983872632",
            type: "text",
            permissionOverwrites: [{
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: interaction.user.id
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925165680184164352'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '990796816222150708'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168758501306379' //trainee
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168660849491998' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168551596286042' //mod
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925166762650116096'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '940333451998031913'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925166842291568660' // management
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '943901471282450452' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925171656022949968' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168258628321351' 
            }
            ]
          }).then(channel => {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription(`\`<:icons_Correct:995546257923768380>\` Ticket <#${channel.id}> has been opened`)], ephemeral: true });
            interaction.message.edit({ embeds: [embed], components: [row] });
            client.channels.cache.get('998720984846700664').send({ content: `<#${channel.id}>`, embeds: [new Discord.MessageEmbed().setTitle("<:icons_folder:995548354530517142> New Ticket").setColor("2F3136").setDescription(`**Opened by:** ${interaction.user.tag}\n**Ticket:** giveaway-${(no).pad(4)}\n**Status:** <:icons_Wrong:995545123142254612> Unclaimed`).setFooter(channel.id).setTimestamp()], components: [claim] });
            channel.send({ content: `<@${interaction.user.id}>` }).then(sent => sent.delete());
            channel.send({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setTitle("**__CLAIM GIVEAWAY PRIZE__**").setDescription("Please send us your username, a staff member will review your ticket soon.").setFooter(`Ticket opened by ${interaction.user.tag} | ${interaction.user.id}`).setTimestamp()], components: [button] });
          });
        });
      }

      if (interaction.values[0] === "store") {
        if ((Date.now() - (ticketOpenCooldown[interaction.user.id] ? ticketOpenCooldown[interaction.user.id] : 0)) <= 10 * 60 * 1000) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You need to wait 10 minutes until you can open another ticket!")], ephemeral: true });
        ticketOpenCooldown[interaction.user.id] = Date.now();

        fs.readFile("ticketno.txt", function(err, data) {
          if (err) return console.error(err);

          const x = data.toString().split(" ").slice(-1).toString();
          const no = parseInt(x) + 1;

          Number.prototype.pad = function(size) {
            let s = String(this);

            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
          };

          fs.writeFile("ticketno.txt", `Ticket Number: ${(no)}`, function(err) { if (err) console.log(err); });

          interaction.guild.channels.create(`store-${(no).pad(4)}`, {
            parent: "998719310983872632",
            type: "text",
            permissionOverwrites: [{
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: interaction.user.id
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925165680184164352'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '990796816222150708'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168758501306379' //trainee
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168660849491998' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168551596286042' //mod
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925166762650116096'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '940333451998031913'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925166842291568660' // management
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '943901471282450452' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925171656022949968' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168258628321351' 
            }
            ]
          }).then(channel => {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription(`\`<:icons_Correct:995546257923768380>\` Ticket <#${channel.id}> has been opened`)], ephemeral: true });
            interaction.message.edit({ embeds: [embed], components: [row] });
            client.channels.cache.get('998720984846700664').send({ content: `<#${channel.id}>`, embeds: [new Discord.MessageEmbed().setTitle("<:icons_folder:995548354530517142> New Ticket").setColor("2F3136").setDescription(`**Opened by:** ${interaction.user.tag}\n**Ticket:** store-${(no).pad(4)}\n**Status:** <:icons_Wrong:995545123142254612> Unclaimed`).setFooter(channel.id).setTimestamp()], components: [claim] });
            channel.send({ content: `<@${interaction.user.id}>` }).then(sent => sent.delete());
            channel.send({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setTitle("**__CLAIM STORE ITEM__**").setDescription("Please send us your username along with what item you need assistance with, a staff member will review your ticket soon.").setFooter(`Ticket opened by ${interaction.user.tag} | ${interaction.user.id}`).setTimestamp()], components: [button] });
          });
        });
      }

      if (interaction.values[0] === "giveawayrole") {
        if (interaction.member?.roles.cache.has("925165735288901683")) {
          interaction.member?.roles.add(client.guilds.cache.get('925160468476207114').roles.cache.find(role => role.id == "925199959211520041"));
          await interaction.reply({ content: "<:icons_Correct:995546257923768380> | Successfully added the **giveaway-ping** role to your account!", ephemeral: true });
        } else {
          await interaction.reply({ content: "<:icons_Wrong:995545123142254612> | You need to verify your account first! Please check <#925164747014426675>.", ephemeral: true });
        }
      }

      if (interaction.values[0] === "sneakpeekrole") {
        if (interaction.member?.roles.cache.has("925165735288901683")) {
          interaction.member?.roles.add(client.guilds.cache.get('925160468476207114').roles.cache.find(role => role.id == "925200070436061264"));
          await interaction.reply({ content: "<:icons_Correct:995546257923768380> | Successfully added the **sneakpeek-ping** role to your account!", ephemeral: true });
        } else {
          await interaction.reply({ content: "<:icons_Correct:995546257923768380> | You need to verify your account first! Please check <#925164747014426675>.", ephemeral: true });
        }
      }

      if (interaction.values[0] === "announcementrole") {
        if (interaction.member?.roles.cache.has("925165735288901683")) {
          interaction.member?.roles.add(client.guilds.cache.get('925160468476207114').roles.cache.find(role => role.id == "925199838331691048"));
          await interaction.reply({ content: "<:icons_Correct:995546257923768380> | Successfully added the **announcement-ping** role to your account!", ephemeral: true });
        } else {
          await interaction.reply({ content: "<:icons_Correct:995546257923768380> | You need to verify your account first! Please check <#925164747014426675>.", ephemeral: true });
        }
      }

      if (interaction.values[0] === "eventrole") {
        if (interaction.member?.roles.cache.has("925165735288901683")) {
          interaction.member?.roles.add(client.guilds.cache.get('925160468476207114').roles.cache.find(role => role.id == "925200166171074641"));
          await interaction.reply({ content: "<:icons_Correct:995546257923768380> | Successfully added the **event-ping** role to your account!", ephemeral: true });
        } else {
          await interaction.reply({ content: "<:icons_Correct:995546257923768380> | You need to verify your account first! Please check <#925164747014426675>.", ephemeral: true });
        }
      }

      if (interaction.values[0] === "pollrole") {
        if (interaction.member?.roles.cache.has("925165735288901683")) {
          interaction.member?.roles.add(client.guilds.cache.get('925160468476207114').roles.cache.find(role => role.id == "925200269501927435"));
          await interaction.reply({ content: "<:icons_Correct:995546257923768380> | Successfully added the **poll-ping** role to your account!", ephemeral: true });
        } else {
          await interaction.reply({ content: "<:icons_Correct:995546257923768380> | You need to verify your account first! Please check <#925164747014426675>.", ephemeral: true });
        } 
      }

      

      if (interaction.values[0] === "partnership") {
        if ((Date.now() - (ticketOpenCooldown[interaction.user.id] ? ticketOpenCooldown[interaction.user.id] : 0)) <= 10 * 60 * 1000) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You need to wait 10 minutes until you can open another ticket!")], ephemeral: true });
        ticketOpenCooldown[interaction.user.id] = Date.now();

        fs.readFile("ticketno.txt", function(err, data) {
          if (err) return console.error(err);

          const x = data.toString().split(" ").slice(-1).toString();
          const no = parseInt(x) + 1;

          Number.prototype.pad = function(size) {
            let s = String(this);

            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
          };

          fs.writeFile("ticketno.txt", `Ticket Number: ${(no)}`, function(err) { if (err) console.log(err); });

          interaction.guild.channels.create(`partnership-${(no).pad(4)}`, {
            parent: "998719310983872632",
            type: "text",
            permissionOverwrites: [{
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: interaction.user.id
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925165680184164352'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '990796816222150708'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168758501306379' //trainee
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168660849491998' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168551596286042' //mod
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925166762650116096'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '940333451998031913'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925166842291568660' // management
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '943901471282450452' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925171656022949968' 
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '925168258628321351' 
            }
            ]
          }).then(channel => {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription(`\`<:icons_Correct:995546257923768380>\` Ticket <#${channel.id}> has been opened`)], ephemeral: true });
            interaction.message.edit({ embeds: [embed], components: [row] });
            client.channels.cache.get('998720984846700664').send({ content: `<#${channel.id}>`, embeds: [new Discord.MessageEmbed().setTitle("<:icons_folder:995548354530517142> New Ticket").setColor("2F3136").setDescription(`**Opened by:** ${interaction.user.tag}\n**Ticket:** partnership-${(no).pad(4)}\n**Status:** <:icons_Wrong:995545123142254612> Unclaimed`).setFooter(channel.id).setTimestamp()], components: [claim] });
            channel.send({ content: `<@${interaction.user.id}>` }).then(sent => sent.delete());
            channel.send({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setTitle("**__APPLY FOR PARTNERSHIP__**").setDescription("Please send us your event detail, type of the event, plan for the event, estimate number of attender, and other related information.").setFooter(`Ticket opened by ${interaction.user.tag} | ${interaction.user.id}`).setTimestamp()], components: [button] });
          });
        });
      }
    }

    if (interaction.isButton()) {
      if (interaction.customId === "staffticket") {
        if ((Date.now() - (ticketOpenCooldown[interaction.user.id] ? ticketOpenCooldown[interaction.user.id] : 0)) <= 10 * 60 * 1000) return interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You need to wait 10 minutes until you can open another ticket!")], ephemeral: true });
        ticketOpenCooldown[interaction.user.id] = Date.now();

        fs.readFile("staffticketno.txt", function(err, data) {
          if (err) return console.error(err);

          const x = data.toString().split(" ").slice(-1).toString();
          const no = parseInt(x) + 1;

          Number.prototype.pad = function(size) {
            let s = String(this);

            while (s.length < (size || 2)) { s = "0" + s; }
            return s;
          };
          /*
          fs.writeFile("staffticketno.txt", `Staff Ticket Number: ${(no)}`, function(err) { if (err) console.log(err); });

          interaction.guild.channels.create(`staff-${(no).pad(4)}`, {
            parent: "997002200788250684",
            type: "text",
            permissionOverwrites: [{
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: interaction.user.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY", "ATTACH_FILES"],
              id: "878534647888359445"
            },
            {
              deny: "VIEW_CHANNEL",
              id: interaction.guild.id
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: '998449167137505341'
            },
            {
              allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
              id: "878534647888359445"
            }
            ]
          }).then(channel => {
            interaction.reply({ embeds: [new Discord.MessageEmbed().setColor(0x00ff00).setDescription(`\`✅\` Ticket <#${channel.id}> has been opened`)], ephemeral: true });
            channel.send({ content: `<@${interaction.user.id}>` }).then(sent => sent.delete());
            channel.send({ embeds: [new Discord.MessageEmbed().setColor(0x1ec45b).setTitle("Staff Ticket").setDescription(`Welcome, ${interaction.user.tag}! A senior staff member will be with you shortly.`).setFooter(`Ticket opened by ${interaction.user.tag} | ${interaction.user.id}`).setTimestamp()], components: [button] });
          });
          **/
        });
      }

      if (interaction.customId === "close_ticket") {
        if (!interaction.channel.name.startsWith("staff")) {
          const attachment = await createTranscript(interaction.channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `${roughScale(interaction.channel.name.split("").slice(-4).toString().replace(/,/g, ""), 10)}.html`,
          });

          const embed = new Discord.MessageEmbed()
            .setColor("#2F3136")
            .setTitle("Ticket Transcript")
            .setThumbnail(config.logo)
            .addFields(
              { name: "Ticket Name", value: interaction.channel.name },
              { name: "Closed By", value: interaction.user.tag },
              { name: "Closed At", value: interaction.createdAt.toLocaleString() }
            );

          interaction.guild.channels.cache.get('925192280267178004').send({
            embeds: [embed],
            files: [attachment]
          });
        }

        interaction.reply({ embeds: [new Discord.MessageEmbed().setColor("#2F3136").setDescription("You have pressed the `[Close Ticket]` button, the ticket will be deleted & archived after 10 seconds!")] });
        setTimeout(() => { interaction?.channel?.delete(); }, 10000);
      }

      if (interaction.customId === "claim_ticket") {
        interaction.update({ embeds: [new Discord.MessageEmbed().setTitle("<:icons_folder:995548354530517142> New Ticket").setColor("#2F3136").setDescription(interaction.message.embeds[0].description.replace(interaction.message.embeds[0].description.split("\n").slice(-1).toString(), `**Status:** <:icons_Correct:995546257923768380> Claimed by ${interaction.user.tag}`)).setFooter(interaction.message.embeds[0].footer.text).setTimestamp()], components: [claimed] });

        const connection = mysql.createConnection({
          host: config.mysqlCredentials.host,
          user: config.mysqlCredentials.user,
          password: config.mysqlCredentials.password,
          database: config.mysqlCredentials.database
        });

        const Guild = client.guilds.cache.get("925160468476207114");
        const member = Guild.members.cache.get(interaction.user.id);

        connection.connect();
        connection.query(`UPDATE StaffStats SET tickets = tickets + 1 WHERE name = '${member.displayName}';`, function(err) {
          if (err) throw err;
        });

        const ticketChnl = interaction.guild.channels.cache.find(c => c.id === interaction.message.embeds[0].footer.text);
        ticketChnl?.permissionOverwrites.create(interaction.user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true, READ_MESSAGE_HISTORY: true, ATTACH_FILES: true });
      }
    }
  }
};