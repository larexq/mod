const { EmbedBuilder } = require('discord.js')
const moment = require('moment')
moment.locale('TR')

    exports.run = (client, message, args) => {

        const member = message.mentions.members.first() || message.member
        const status = {
            online: '<:online:1030767336782839818> **Çevrimiçi**',
            idle: '<:idle:1030767349151834142> **Boşta**',
            dnd: '<:dnd:1030769176316493857> **Rahatsız Etmeyin**',
            offline: '<:offline:1030767375693385778> **Çevrimdışı**'
        }
const embed = new EmbedBuilder()
.setTitle("Kullanıcı Bilgi")
.setDescription(`<a:hype:1030583980719865909> **Kullanıcı Adı:** ${member.user.username}\n<a:hype:1030583980719865909> **Kullanıcı ID:** ${member.id}\n<a:hype:1030583980719865909> **Status:** ${status[member.presence.status]}\n<a:hype:1030583980719865909> **Hesap Oluşturulma Tarihi:** \`${moment.utc(member.user.createdAt).format('LLLL')}\`\n<a:hype:1030583980719865909> **Sunucuya Katılım Tarihi:** \`${moment.utc(member.joinedAt).format('LLLL')}\`\n<a:hype:1030583980719865909> **Rolleri:** ${member.roles.cache.map(role => role.toString())}`)
.setColor("BLACK")
        
        message.channel.send({embeds: [embed]})
    }
    exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ["kb","kullanıcı-bilgi"],
        permLevel: 0
       };
       
       exports.help = {
          name: 'kullanıcı-bilgi',
        description: 'kullanıcı bilgi verir',
        usage: 'kb'
       };