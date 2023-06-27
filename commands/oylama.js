const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const db = require("croxydb")
const Discord = require("discord.js")

module.exports = {
  name: "oylama",
  description: "Oylama yaparsın.",
  type: 1,
  options: [
    {
        name: "oylaman",
        description: "Oylama ne olsun?",
        type: 3,
        required: true
    }
  ],

  run: async(client, interaction, config, db) => {
    
    const yetki = new EmbedBuilder()
    .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olman gerekiyor.`)

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki] })

    const oylama = interaction.options.getString('oylaman')

    const embed = new EmbedBuilder()
    .setTitle("Yeni Oylama!")
    .setDescription(`Oylama: **${oylama}**`)
interaction.channel.send({ embeds: [embed]}).then((mesaj) => {
interaction.reply({content: "Oylama Başarıyla Oluşturuldu.", ephemeral: true}) 
mesaj.react("✅")
mesaj.react("❌")

})
  }
}