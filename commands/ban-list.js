const {EmbedBuilder} = require("discord.js");
const moment = require("moment");
  require("moment-duration-format");
  const os = require("os");
exports.run = async (client, message, args) => {
    var userlist = message.guild.bans.fetch()
    userlist.then(collection => {
    if(collection.first() == null){
      
    const embed = new EmbedBuilder()
    .setDescription("Sunucuda Banlanan Kimse Yok!")      
    .setColor("BLACK")
    message.channel.send({embeds: [embed]})
      
    } else {
    const data = collection.map(mr => "`"+mr.user.tag+"`").slice(0, 60).join(", ")
    const embed2 = new EmbedBuilder()
    .setTitle("Ban Listesi")
    .setColor("BLACK")
    .setDescription(data)
    
    message.channel.send({embeds: [embed2]})
    }
})
};
exports.conf = {
  aliases: []
};

exports.help = {
  name: "ban-list"
};
