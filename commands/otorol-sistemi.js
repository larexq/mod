const { EmbedBuilder, PermissionsBitField, RoleSelectMenuBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "otorol-sistemi",
    description: 'Otorol sistemini ayarlarsınız.',
    type: 1,
    options: [
      {
        name: "userrol",
        description: "Normal kullanıcılara verilmesini istediğin rol.",
        type: 8,
        required: true
      },
      {
        name: "botrol",
        description: "Botlara verilmesini istediğin rol.",
        type: 8,
        required: true
      },
      {
        name: "kanal",
        description: "Otorol verildiğinde log atılmasını istediğin kanal.",
        type: 7,
        channel_types: [0],
        required: false
      }
    ],
    
    run: async(client, interaction) => {

    const yetki = new EmbedBuilder()
    .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Bu komutu kullanabilmek için \`Yönetici\` yetkisine sahip olman gerekiyor.`)

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetki] })

    const userrol = interaction.options.getRole("userrol")
    const botrol = interaction.options.getRole("botrol")

    const kanal = interaction.options.getChannel("kanal")

    if(kanal) {

      db.set(`otorolsistem_${interaction.guild.id}`, {userrol: userrol.id, botrol: botrol.id, kanal: kanal.id })

      const nice = new EmbedBuilder()
      .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
      .setDescription(`Kullanıcı oto rol: ${userrol} Bot oto rol: ${botrol}\nBildirim atılacak kanal: ${kanal} olarak ayarlandı.\nSistemi sıfırlamak için: \`/otorol-sıfırla\``)
      return interaction.reply({ embeds: [nice] })

    }

    if(!kanal) {

      db.set(`otorolsistem_${interaction.guild.id}`, {userrol: userrol.id, botrol: botrol.id })

      const nice = new EmbedBuilder()
      .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
      .setDescription(`Kullanıcı oto rol: ${userrol} Bot oto rol: ${botrol}\nSistemi sıfırlamak için: \`/otorol-sıfırla\``)
      return interaction.reply({ embeds: [nice] })
    }
}

};