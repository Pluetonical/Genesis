const Discord = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(interaction, client) { 
        if ( interaction.isButton()) {
            if ( interaction.customId === "accept") {
                if ( interaction.member.id !== '925166842291568660') return interaction.reply({ content: '**You do not have permission to accept suggestions!**', ephemeral: true })
              interaction.reply("suggestion accepted")
            }
          }
    }
}