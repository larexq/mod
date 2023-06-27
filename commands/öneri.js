const { CommandInteraction, EmbedBuilder } = require('discord.js');
const config = require('../config.json');
const db = require("croxydb")

module.exports = {
    name: 'öneri',
    description: 'Bir öneride bulunun.',
    options: [
      {
        name: 'mesaj',
        type: 3,
        description: 'Önerinizi yazın.',
        required: true
      }
    ],
    run: async(client, interaction) => {

    const öneri = interaction.options.getString('mesaj');

    const embed = new EmbedBuilder()
      .setAuthor({ name: `Öneri Sistemi`, iconURL: interaction.guild.iconURL() })
      .addFields(
       { name: 'Kullanıcı', value: `\`\`\`fix\n${interaction.user.username} (${interaction.user.id})\`\`\`` },
       { name: 'Sunucu Adı', value: `\`\`\`fix\n${interaction.guild.name} (${interaction.guild.id})\`\`\`` },
       { name: 'Öneri', value: `\`\`\`fix\n${öneri}\`\`\`` },
       { name: 'Sunucu Linki', value: `\`\`\`fix\nhttps://discord.gg/${(await interaction.guild.invites.create(interaction.channel.id)).code}\`\`\`` }
       )
      .setTimestamp()

    const channel = db.fetch(`önerisistem`)
    if (!channel) return interaction.reply({ content: `Öneri sistemi kapalı.`, ephemeral: true })

    client.channels.cache.get(channel).send({ embeds: [embed] });

    interaction.reply({ content: `Öneriniz başarıyla gönderildi.`, ephemeral: true });
  }
};