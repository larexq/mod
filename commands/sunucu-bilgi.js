const Discord = require("discord.js")
const apii = require("useful-tools")
exports.run = async (client, message, args) => {
  
 
    const owner = message.guild.members.cache.get(message.guild.ownerId);
const embed = new Discord.EmbedBuilder()
    .setTitle(message.guild.name + " Sunucu Bilgileri")
    .setColor("BLACK")
    .setDescription(`<a:hype:1030583980719865909> **Sunucu Sahibi:** <@${owner.user.id}>\n<a:hype:1030583980719865909> **Kanal Sayıları:** ${message.guild.channels.cache.size.toLocaleString()}\n<a:hype:1030583980719865909> **Emoji Sayısı:** ${message.guild.emojis.cache.size}\n<a:hype:1030583980719865909> **Rol Sayısı:** ${message.guild.roles.cache.size}\n<a:hype:1030583980719865909> **Kuruluş:** \`${apii.tarih(message.guild.createdTimestamp)}\``)
    .setThumbnail(message.guild.iconURL())
    .setTimestamp()
  message.channel.send({embeds: [embed]})
}

exports.conf = {
  aliases: ["sb"]
}

exports.help = {
  name: "sunucubilgi"
}