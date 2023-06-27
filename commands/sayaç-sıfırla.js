const { EmbedBuilder, PermissionsBitField, RoleSelectMenuBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "sayaç-sıfırla",
    description: 'Sayaç sistemini sıfırlarsınız.',
    type: 1,
    options: [],
    
  run: async(client, interaction) => {

    const yetki = new EmbedBuilder()
    .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olman gerekiyor.`)

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki] })

    const sistem = db.fetch(`sayaçsistem_${interaction.guild.id}`)

    const zaten = new EmbedBuilder()
    .setAuthor({ name: "Zaten Yok", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Sayaç sistemini zaten ayarlamamışsın.`)

    if(!sistem) return interaction.reply({ embeds: [zaten] })

    db.delete(`sayaçsistem_${interaction.guild.id}`)

    const nice = new EmbedBuilder()
    .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Sayaç sistemi başarıyla sıfırlandı.`)
    interaction.reply({ embeds: [nice] })
}

};