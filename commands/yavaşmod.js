const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.json")
const request = require("request")

module.exports = {
  name: "yavaş-mod",
  description: "Kanalın yazma limitini ayarlarsın.",
  type: 1,
  options: [
    {
        name: "kanal",
        description: "Hangi kanalın yazma limiti ayarlansın?",
        type: 7,
        required: true,
        channel_types: [0]
    },
    {
        name: "saniye",
        description: "Yavaş mod kaç saniye olsun?",
        type: 3,
        required: true
    },  
],
run: async(client, interaction) => {

    const yetki = new EmbedBuilder()
    .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Bu komutu kullanabilmek için \`Kanalları Yönet\` yetkisine sahip olman gerekiyor.`)

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ embeds: [yetki] })

    const kanal = interaction.options.getChannel("kanal")
    const süre = interaction.options.getString("saniye") 

    const hata = new EmbedBuilder()
    .setAuthor({ name: "Fazla Saniye", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Max 6 saat (21600) saniye ayarlayabilirim.`)

    if (süre > 21600) return interaction.reply({ embeds: [hata] })

    request({
url: `https://discordapp.com/api/v9/channels/${kanal.id}`,
method: "PATCH",
json: {
rate_limit_per_user: süre
},
headers: {
"Authorization": `Bot ${config.token}`
},
})

const nice = new EmbedBuilder()
.setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
.setDescription(`Yazma limitini \`${süre}\` saniye olarak ayarladım.`)

   interaction.reply({ embeds: [nice] })
  }
};