const Discord = require("discord.js");
exports.run = async (client, message, args) => {


  const yetki = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Bu Komutu Kullanabilmek İçin Yönetici Yetkisine Sahip Olman Gerekiyor.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")

    if (!message.member.permissions.has(Discord.PermissionsBitField.Flags.Administrator))
    return message.reply({embeds: [yetki]})

    const sess = new Discord.EmbedBuilder()
  .setDescription(`${message.author} **| Bir Ses Kanalında Değilsin.** <a:crosss:1030583088130035812>`)
  .setColor("BLACK")
  
    if (!message.member.voice.channel)
    return message.reply({embeds: [sess]});
  
    const userr = new Discord.EmbedBuilder()
    .setDescription(`${message.author} **| Bir Kullanıcıyı Etiketlemelisin.** <a:crosss:1030583088130035812>`)
    .setColor("BLACK")
  
    let kullanıcı = message.mentions.members.first();
  if (!kullanıcı)
    return message.reply({embeds: [userr]});
  
    const sess2 = new Discord.EmbedBuilder()
    .setDescription(`${message.author} **| Etiketlediğin Kişi Bir Ses Kanalında Değil.** <a:crosss:1030583088130035812>`)
    .setColor("BLACK")

    if (!kullanıcı.voice.channel)
    return message.reply({embeds: [sess2]});


    const nice = new Discord.EmbedBuilder()
    .setDescription(`${message.author} **| Kullanıcıyı Senin Yanına Çektim** <a:tickpiola:1030784957121056819>`)
    .setColor("BLACK")

  kullanıcı.voice.setChannel(message.member.voice.channelId)
  message.reply({embeds: [nice]});
};

exports.conf = {
  aliases: ["çek"]
};

exports.help = {
  name: "ses-çek"
};