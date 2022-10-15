const Discord = require('discord.js')
const config = require("../config.js")
const token = config.token

exports.run = async(client, message, args) => {

    const yetki = new Discord.EmbedBuilder()
    .setDescription(`${message.author} **| Bu Komutu Kullanabilmek İçin Kanalları Yönet Yetkisine Sahip Olman Gerekiyor.** <a:crosss:1030583088130035812>`)
    .setColor("BLACK")
    
    if(!message.member.permissions.has(Discord.PermissionsBitField.Flags.ManageChannels)) return message.reply({embeds: [yetki]})

    if (message.channel.type !== Discord.ChannelType.GuildText) return;
const limit = args[0] ? args[0] : 0;


const limitt = new Discord.EmbedBuilder()
.setDescription(`${message.author} **| Limiti Aştın. | \`${config.prefix}yavaşmod [0/21600]\`** <a:crosss:1030583088130035812>`)
.setColor("BLACK")

const sayii = new Discord.EmbedBuilder()
.setDescription(`${message.author} **| Bir Sayı Girmelisin.** <a:crosss:1030583088130035812>`)
.setColor("BLACK")


if(!limit) return message.reply({embeds: [sayii]})



if(isNaN(limit)) return message.reply({embeds: [sayii]})



if (limit > 21600) return message.reply({embeds: [limitt]})

const nice = new Discord.EmbedBuilder()
.setDescription(`**Yazma Süre Limiti** \`${limit}\` **Saniye Olarak Ayarlandı.** <a:tickpiola:1030784957121056819>`)
.setColor("BLACK")


message.reply({embeds: [nice]})

var request = require('request');
request({
url: `https://discordapp.com/api/v9/channels/${message.channel.id}`,
method: "PATCH",
json: {
rate_limit_per_user: limit
},
headers: {
"Authorization": `Bot ${token}`
},
})

}

exports.conf = {
aliases: ["slow-mode", "slowmode", "yavas-mod", 'yavasmod', 'yavaşmod']
}

exports.help = {
name: 'yavaş-mod'
}