const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  const yetki = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Bu Komutu Kullanabilmek İçin Yönetici Yetkisine Sahip Olman Gerekiyor.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")

        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.reply({embeds: [yetki]})

        const userr = new Discord.EmbedBuilder()
        .setDescription(`${message.author} **| Bir Kullanıcı ID Girmelisin.** <a:crosss:1030583088130035812>`)
        .setColor("BLACK")


        let kullanıcı = args[0]
if (!kullanıcı) return message.reply({embeds: [userr]})

message.guild.members.ban(kullanıcı)

const nice = new Discord.EmbedBuilder()
.setTitle("Yasaklama")
.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
.setDescription(`<a:staff:1030578443785605130> **Banlanılan ID:** `+ kullanıcı +`

<a:staff:1030578443785605130> **Banlayan** ${message.author}`)
.setColor("BLACK")
return message.channel.send({embeds: [nice]})



}

  exports.conf = {
  aliases: ["fban"]
};

exports.help = {
  name: "forceban"
};