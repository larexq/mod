const { EmbedBuilder, PermissionsBitField, RoleSelectMenuBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "sayaç-sistemi",
    description: 'Saya. sistemini ayarlarsınız.',
    type: 1,
    options: [
      {
        name: "userhedef",
        description: "Sunucudaki kullanıcı sayısı hedefin nedir?",
        type: 10,
        required: true
      },
      {
        name: "kanal",
        description: "Sayacı atıcağı kanal seç.",
        type: 7,
        channel_types: [0],
        required: true
      }
    ],
    
  run: async(client, interaction) => {

    const yetki = new EmbedBuilder()
    .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olman gerekiyor.`)

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki] })

    const userhedef = interaction.options.getNumber("userhedef")
    const kanal = interaction.options.getChannel("kanal")

    const olmaz = new EmbedBuilder()
    .setAuthor({ name: "Hata", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Belirlediğin kullanıcı hedefi şimdiki kullanıcı sayısından büyük olmalı.`)

    if(userhedef <= interaction.guild.memberCount) return interaction.reply({ embeds: [olmaz] })

    db.set(`sayaçsistem_${interaction.guild.id}`, { hedef: userhedef, kanal: kanal.id })

    const nice = new EmbedBuilder()
    .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Kullanıcı hedefi: \`${userhedef}\`\nBildirim kanalı: ${kanal} olarak ayarlandı.`)
    interaction.reply({ embeds: [nice] })
}

};