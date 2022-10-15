const {EmbedBuilder} = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
exports.run = async (client, message, args) => {
 
  const yetki = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Bu Komutu Kullanabilmek İçin Rolleri Yönet Yetkisine Sahip Olman Gerekiyor.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")
 
  if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageRoles)) return message.reply({embeds: [yetki]})
   
  const userr = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Bir Kullanıcı Etiketlemelisin.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")

  const roll = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Verilecek Rolü Etiketlemelisin.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")
  
  let user = message.mentions.users.first();
    let rol = message.mentions.roles.first();
    if(!user) return message.reply({embeds: [userr]})
    if(!rol) return message.reply({embeds: [roll]})
    

    const nice = new Discord.EmbedBuilder()
    .setDescription(`${user} **Adlı Kullanıcıya** ${rol} **Rolünü Verdim.** <a:tickpiola:1030784957121056819>`)
    .setColor("BLACK")

    message.guild.members.cache.get(user.id).roles.add(rol)
  
    message.reply({embeds: [nice]})
}
exports.conf = {
  aliases: []
};

exports.help = {
  name: "rol-ver"
};
