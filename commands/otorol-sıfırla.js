const { EmbedBuilder, PermissionsBitField, RoleSelectMenuBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "otorol-sıfırla",
    description: 'Otorol sistemini sıfırlarsınız.',
    type: 1,
    options: [],
    
  run: async(client, interaction) => {

    const yetki = new EmbedBuilder()
    .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olman gerekiyor.`)

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki] })

    const sistem = db.fetch(`otorolsistem_${interaction.guild.id}`)

    const zaten = new EmbedBuilder()
    .setAuthor({ name: "Zaten Yok", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Otorol sistemini zaten ayarlamamışsın.`)

    if(!sistem) return interaction.reply({ embeds: [zaten] })

    db.delete(`otorolsistem_${interaction.guild.id}`)
    const nice = new EmbedBuilder()
    .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Otorol sistemi başarıyla sıfırlandı.`)
    return interaction.reply({ embeds: [nice] })
}

};