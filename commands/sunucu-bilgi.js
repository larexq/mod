const {  EmbedBuilder, PermissionsBitField, Embed } = require("discord.js");
const moment = require("moment")
moment.locale("TR")

module.exports = {
    name: "sunucu-bilgi",
    description: 'Sunucu bilgilerine bakarsınız.',
    type: 1,
    options: [],
  run: async(client, interaction) => {


    const owner = interaction.guild.members.cache.get(interaction.guild.ownerId);

    const embed = new EmbedBuilder()
    .setAuthor({ name: `${interaction.guild.name} | Sunucusunun Bilgileri`, iconURL: interaction.guild.iconURL() })
    .setDescription(`Sunucu Sahibi: <@${owner.user.id}>
    Kanal Sayıları: \`${interaction.guild.channels.cache.size.toLocaleString()}\`
    Emoji Sayısı: \`${interaction.guild.emojis.cache.size}\`
    Rol Sayısı: \`${interaction.guild.roles.cache.size}\`
    Kuruluş: \`${moment.utc(interaction.guild.createdTimestamp).format("LLLL")}\``)
    .setThumbnail(interaction.guild.iconURL())
    
    interaction.reply({ embeds: [embed] })
}

};