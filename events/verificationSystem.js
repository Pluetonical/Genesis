const { Interaction } = require("discord.js");
const config = require("../config.js");

module.exports = {
  name: "interactionCreate",
  once: false,
  async execute(interaction, client) {
    if (interaction.customId === "verify") {
      
      interaction.member.roles.add('925165735288901683')
      
    }
  }
};