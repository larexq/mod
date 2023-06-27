const { CommandInteraction, EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../config.json');
const db = require("croxydb")

module.exports = {
    name: 'oto-cevap-sıfırla',
    description: 'Oto cevap sistemini sıfırlar.',
    options: [
        {
            name: "mesaj",
            description: "Hangi oto cevap silinsin?",
            type: 3,
            required: true
        }
    ],
    run: async(client, interaction) => {

    const yetki = new EmbedBuilder()
    .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olman gerekiyor.`)

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki] })

    const sistem = db.fetch(`otocevapsistem_${interaction.guild.id}`)
    const mesaj = interaction.options.getString("mesaj")
    
    const hata = new EmbedBuilder()
    .setAuthor({ name: "Zaten Yok", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Oto cevap sistemi zaten sunucuda ayarlı değil.`)

    if(!sistem) return interaction.reply({ embeds: [hata] })

    db.delete(`otocevapsistem_${interaction.guild.id}`, mesaj)

    const nice = new EmbedBuilder()
    .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`\`${mesaj}\` oto cevap sistemi başarıyla sıfırlandı.`)
    interaction.reply({ embeds: [nice] })
  }
};