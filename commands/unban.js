const {EmbedBuilder} = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
exports.run = async (client, message, args) => {
   
  const yetki = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Bu Komutu Kullanabilmek İçin Yönetici Yetkisine Sahip Olman Gerekiyor.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")
  
  if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.reply({embeds: [yetki]})
 
 
  const userr = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Bir Kullanıcıyı Etiketlemelisin.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")
 
  let user = args[0]
  if (!user) return message.reply({embeds: [userr]})
 
 
  const nice = new Discord.EmbedBuilder()
  .setDescription(`**Başarıyla** ${user} **Kullanıcısının Banı Açıldı.** <a:tickpiola:1030784957121056819>`)
  .setColor("BLACK")
 
  message.reply({embeds: [nice]})
  message.guild.members.unban(user);
}
exports.conf = {
  aliases: []
};

exports.help = {
  name: "unban"
};
