const Discord = require("discord.js");
const messageCreate = require("./messageCreate");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) { 
      
      await interaction.deferUpdate().catch(() => {})
            switch (interaction.customId) {
              case 'acceptsuggest':
                let em = interaction.message.embeds[0] 
                let editem = {author:em.author,color:'#00FF00',timestamp: em.timestamp, footer: em.footer, description:em.description, fields:em.fields,}
                const button = new Discord.MessageActionRow().addComponents(
                  new Discord.MessageButton().setCustomId("upvote").setEmoji('<:icons_upvote:995545071795572758>').setLabel("Up Vote").setStyle("SECONDARY"),
                  new Discord.MessageButton().setCustomId("downvote").setEmoji('<:icons_downvote:995546425704333322>').setLabel("Down Vote").setStyle("SECONDARY")
                );
                if (!interaction.member?.roles.cache.has('925165680184164352')) return interaction.reply({ content: '**You do not have permission to accept suggestions!**', ephemeral: true })
                interaction.message.edit({components: [button], embeds: [editem]})
                break;
              case 'denysuggest':
                let ems = interaction.message.embeds[0]
                let edit = {author:ems.author,color:'#ff0000',timestamp: ems.timestamp, footer: ems.footer, description:ems.description, fields:ems.fields,}
                const button2 = new Discord.MessageActionRow().addComponents(
                  new Discord.MessageButton().setCustomId("upvote").setEmoji('<:icons_upvote:995545071795572758>').setLabel("Up Vote").setStyle("SECONDARY"),
                  new Discord.MessageButton().setCustomId("downvote").setEmoji('<:icons_downvote:995546425704333322>').setLabel("Down Vote").setStyle("SECONDARY")
                );
                if (!interaction.member?.roles.cache.has('925165680184164352')) return interaction.reply({ content: '**You do not have permission to deny suggestions!**', ephemeral: true })
                interaction.message.edit({components: [button2], embeds: [edit]})
                break;
              case 'upvote':
                  
                  await db.push(interaction.message.id.toString()+".voters", '1212121212122')
                  let embed = interaction.message.embeds[0]
                  let value = db.get(interaction.message.id.toString()+".voters") 
                  let  newNumber  = Number(embed.fields[0].value.split("```\n")[1].split("```")[0]) + 1;
                  console.log(await value)
                if ( (await value).includes(interaction.user.id) === undefined) return db.deleteAll()
                  if ((await value).includes(interaction.user.id) ) return interaction.followUp({content:"You have voted for this suggestion before.", ephemeral:true});
                console.log(interaction.user.id)
                  let editEmbed = {author:embed.author,color:embed.color,timestamp: embed.timestamp, footer: embed.footer, description:embed.description, fields:[
                    {name:"<:icons_upvote:995545071795572758> Up votes:",value:`\`\`\`\n${newNumber}\`\`\``,inline:true},
                embed.fields[1],
                  ]}
                  
                  await db.push(interaction.message.id.toString()+".voters", interaction.user.id.toString())
                
                interaction.message.edit({components: interaction.message.components,embeds: [editEmbed]})
                break;
              case 'downvote':
                let embedd = interaction.message.embeds[0]
                let valued = db.get(interaction.message.id.toString()+".voters") 
                let  newNumberd  = Number(embedd.fields[1].value.split("```\n")[1].split("```")[0]) + 1;
                await db.push(interaction.message.id.toString()+".voters", '1212121212122')
                  
                
                  if ((await valued).includes(interaction.user.id) ) return interaction.followUp({content:"You have voted for this suggestion before.", ephemeral:true});
                console.log(interaction.user.id)
                  let editEmbeds = {author:embedd.author,color:embedd.color,timestamp: embedd.timestamp, footer: embedd.footer, description:embedd.description, fields:[
                    embedd.fields[0],
                    {name:"<:icons_downvote:995546425704333322> Down votes:",value:`\`\`\`\n${newNumberd}\`\`\``,inline:true},
                  ]}
                  
                  await db.push(interaction.message.id.toString()+".voters", interaction.user.id.toString())
                
                interaction.message.edit({components: interaction.message.components,embeds: [editEmbeds]})
                break;
              default:
                break;
            }
            
          }
    
}