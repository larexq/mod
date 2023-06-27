const { Client, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "kurucu",
  description: "Sunucunun tacı kimde?",
  type: 1,
  options: [],

  run: async(client, interaction) => {

    const owner = interaction.guild.members.cache.get(interaction.guild.ownerId);

    const embed = new EmbedBuilder()
    .setAuthor({ name: `${interaction.guild.name} | Kurucu`, iconURL: interaction.guild.iconURL() })
    .setDescription(`Sunucunun kurucusu ${owner.user} (\`${owner.user.username}\` - \`${owner.id}\`)`)

    interaction.reply({ embeds: [embed] })

  }
}