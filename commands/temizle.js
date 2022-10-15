const {EmbedBuilder} = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
exports.run = async (client, message, args) => {
   
  const yetki = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Bu Komutu Kullanabilmek İçin Mesajları Yönet Yetkisine Sahip Olman Gerekiyor.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")
  
  if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageMessages)) return message.reply({embeds: [yetki]})
  
  const sayiii = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Temizlenecek Mesaj Sayısını Girin.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")
  
  let sayi = args[0]
  if (!sayi) return message.reply({embeds: [sayiii]})
 
  const nice = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Başarıyla `+sayi +` Adet Mesaj Silindi.** <a:clear:1030789775738818620>`)
  .setColor("BLACK")
 
 
  message.channel.bulkDelete(sayi)
 message.channel.send({embeds: [nice]})
}
exports.conf = {
  aliases: ["sil"]
};

exports.help = {
  name: "temizle"
};
