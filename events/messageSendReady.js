const config = require("../config.js");
const Discord = require("discord.js");



module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    const ticketChannel = await client.guilds.cache.get('925160468476207114').channels.fetch('925165041014149140');
    const collection = await ticketChannel.messages.fetch();
    //const ticketStaffChannel = await client.guilds.cache.get('925160468476207114').channels.fetch('997002362138927104');
    //const staffCollection = await ticketStaffChannel.messages.fetch();
    const roleChannel = await client.guilds.cache.get('925160468476207114').channels.fetch('925162992767729755');
    const roleCollection = await roleChannel.messages.fetch();
    const verifychannel = await client.guilds.cache.get('925160468476207114').channels.fetch('925164747014426675');
    const verifyCollection = await verifychannel.messages.fetch();

 

    
    //Verify message
    if (verifyCollection.size === 0 ) {
      const embed = new Discord.MessageEmbed()
      .setTitle('Genesis Verification')
      .setColor('#2F3136')
      .setImage('https://discord.com/channels/@me/997735117445419118/998435623734095894')
      .setDescription('Please verify here to gain access to our discord!')
      .addField('**Please React to atleast one role to limit everyone pings!**', '<#925162992767729755>')
      const button = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton().setCustomId("verify").setEmoji('<:icons_colorserververified:995546207361441793>').setLabel("Verify").setStyle("SUCCESS")
      )
      verifychannel.send({
        embeds: [embed],
        components: [button]
      })
    }
    //Normal Ticket Message 
    if (collection.size === 0) {
      const row = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu()
        .setCustomId("ticketselection")
        .setPlaceholder("Select an option (1-5)")
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

      ticketChannel.send({
        embeds: [embed],
        components: [row]
      });
    }

    //Staff Ticket Message        

   
    //Role Selection Message
    if (roleCollection.size === 0) {
      const row = new Discord.MessageActionRow().addComponents(new Discord.MessageSelectMenu()
        .setCustomId("ticketselection")
        .setPlaceholder("Select an option")
        .setMaxValues(3)
        .addOptions([{
          label: "Giveaway Ping",
          description: "This role will be pinged when we host giveaways.",
          value: "giveawayrole",
          emoji: "<:icons_tada:995551400849313815>"
        },
        {
          label: "Sneak Peek Ping",
          description: "This role will be pinged when we post sneak peeks.",
          value: "sneakpeekrole",
          emoji: "<:icons_tilde:995547160575746100>"
        },
        {
          label: "Announcments Ping",
          description: "This role will be pinged when we post Announcments.",
          value: "announcementrole",
          emoji: "<:icons_richpresence:995547991689674752>"
        },
        {
          label: "Events Ping",
          description: "This role will be pinged when we start an event.",
          value: "eventrole",
          emoji: "<:icons_coin:995546141259223070>"
        },
        {
          label: "Polls Ping",
          description: "This role will be pinged when we post a new poll.",
          value: "pollrole",
          emoji: "<:icons_upvote:995545071795572758>"
        },
      
        
        ])
      );

      const embed = new Discord.MessageEmbed()
        .setTitle("Genesis - Role Selection")
        .setColor("#2F3136")
        .setThumbnail(config.logo)
        .setDescription("Select the roles you would like to be notified for within this Discord server. You can select the following roles:\n\n<:icons_tada:995551400849313815> **Giveaway Ping**\n<:icons_tilde:995547160575746100> **Sneak Peek Ping**\n<:icons_richpresence:995547991689674752> **Announcment Ping**\n<:icons_coin:995546141259223070> **Event Ping**\n<:icons_upvote:995545071795572758> **Polls Ping**\n");

      roleChannel.send({
        embeds: [embed],
        components: [row]
      });
    }
  }
};