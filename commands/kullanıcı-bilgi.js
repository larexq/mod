const {  EmbedBuilder, PermissionsBitField, Embed } = require("discord.js");
const moment = require("moment")
moment.locale("TR")

module.exports = {
    name: "kullanıcı-bilgi",
    description: 'Belirttiğin kullanıcının bilgilerine bakarsınız.',
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Bilgilerine bakmak istediğin kullanıcı.",
            type: 6,
            required: true
        }
      
    ],
  run: async(client, interaction) => {

    const user = interaction.options.getMember('kullanıcı')

    const status = {
        online: "Çevrimiçi",
        idle: "Boşta",
        dnd: "Rahatsız Etme",
        offline: "Çevrimdışı"
    }

    const embed = new EmbedBuilder()
    .setAuthor({ name: `${user.user.username} | Kullanıcısının Bilgileri`, iconURL: user.user.displayAvatarURL() })
    .setDescription(`Kullanıcı Adı: \`${user.user.username}\`
    Kullanıcı ID: \`${user.id}\`
    Durumu: \`${status[user.presence.status]}\`
    Hesap Oluşturma Tarihi: \`${moment.utc(user.user.createdAt).format("LLLL")}\` (**${moment(user.user.createdAt, "YYYYMMDD").fromNow()}**)
    Sunucuya Katılma Tarihi: \`${moment.utc(user.joinedAt).format("LLLL")}\` (**${moment(user.joinedAt, "YYYYMMDD").fromNow()}**)
    Rolleri: ${user.roles.cache.map(role => role.toString())}`)

    interaction.reply({ embeds: [embed] })
}

};