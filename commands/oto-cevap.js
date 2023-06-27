const { CommandInteraction, EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../config.json');
const db = require("croxydb")

module.exports = {
    name: 'oto-cevap',
    description: 'Belirlenen mesaja otomatik cevap verir.',
    options: [
          {
            name: 'mesaj1',
            type: 3,
            description: 'Hangi mesaj yazılınca 2. mesaj atılsın',
            required: true
          },
          {
            name: 'mesaj2',
            type: 3,
            description: '1. mesaj atılınca ne mesajı yazsın.',
            required: true
          }
    ],
    run: async(client, interaction) => {

    const mesaj1 = interaction.options.getString("mesaj1");
    const mesaj2 = interaction.options.getString("mesaj2");

    const yetki = new EmbedBuilder()
    .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olman gerekiyor.`)

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki] })

    db.set(`otocevapsistem_${interaction.guild.id}`, { mesaj1: mesaj1, mesaj2, mesaj2 })

    const nice = new EmbedBuilder()
    .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Artık \`${mesaj1}\` mesajı yazıldığına otomatik olarak \`${mesaj2}\` mesajı atılacak.`)
    interaction.reply({ embeds: [nice] })
  }
};