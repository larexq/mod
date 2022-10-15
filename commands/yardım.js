const {EmbedBuilder} = require("discord.js");
const Discord = require("discord.js")
const config = require("../config.js")
exports.run = async (client, message, args) => {

 const embed = new EmbedBuilder()
 .setTitle("Moderasyon - Yardım")
 .setDescription(`**<a:hype:1030583980719865909> |** \`${config.prefix}afk Sebep\` **: Kullanıcı Afk Olur.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}avatar / ${config.prefix}avatar @Kullanıcı\` **: Belirtilen Kullanıcının Avatarını Atar.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}ban-list\` **: Sunucudaki Banlı Üyeleri Gösterir.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}ban @Kullanıcı\` **: Belirtilen Kullanıcıyı Sunucudan Banlar.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}forceban ID\` **: Belirtilen ID'yi Sunucudan Banlar.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}kick @Kullanıcı\` **: Belirtilen Kullanıcıyı Sunucudan Kickler.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}kullanıcı-bilgi\` **: Belirtilen Kullanıcının Bilgilerini Gösterir.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}owner\` **: Sunucunun Kurucusunu Gösterir.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}rol-al @Kullanıcı @Rol\` **: Belirtilen Kullanıcıdan Rol Alınır.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}rol-ver @Kullanıcı @Rol\` **: Belirtilen Kullanıcıya Rol Verilir.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}sesli-çek @Kullanıcı\` **: Belirttiğin Kullanıcıyı Kendi Ses Kanalına Çekersin.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}yavaş-mod \` **: Kullanılan Kanalın Yazma Süresini Belirler.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}sunucu-bilgi\` **: Sunucunun Temel Bilgilerini Gösterir.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}sil\` **: Belirtilen Sayı Kadar Mesaj Siler.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}unban @Kullanıcı\` **: Belirtilen Kullanıcının Banını Kaldırır.**\n**<a:hype:1030583980719865909> |** \`${config.prefix}yardım\` **: Bu Sayfayı Açar.**`)
 .setFooter({ text: `İsteyen: ${message.author.tag}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
 
message.reply({embeds: [embed]})
  
}
exports.conf = {
  aliases: []
};

exports.help = {
  name: "yardım"
};
