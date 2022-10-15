const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  const yetki = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Bu Komutu Kullanabilmek İçin Yönetici Yetkisine Sahip Olman Gerekiyor.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")

        if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator)) return message.reply({embeds: [yetki]})


        let user = message.mentions.users.first();

        const userr = new Discord.EmbedBuilder()
        .setDescription(`${message.author} **| Bir Kullanıcı Etiketlemelisin.** <a:crosss:1030583088130035812>`)
        .setColor("BLACK")


        if(!user) return message.channel.send({embeds: [userr]})




const üye = message.guild.members.cache.get(user.id)


üye.kick()



const nice = new Discord.EmbedBuilder()
.setTitle("Yasaklama")
.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
.setDescription(`<a:staff:1030578443785605130> **Kiclenen** ${üye}

<a:staff:1030578443785605130> **Kickleyen** ${message.author}`)
.setColor("BLACK")
return message.channel.send({embeds: [nice]})









}

  exports.conf = {
  aliases: []
};

exports.help = {
  name: "kick"
};