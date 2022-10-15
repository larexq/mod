const {EmbedBuilder} = require("discord.js");
const Discord = require("discord.js")
const db = require("croxydb")
exports.run = async (client, message, args) => {
    var kullanıcı = message.author;
    var sebep = args.slice(0).join("  ");
    
    const sebepp = new EmbedBuilder()
    .setDescription(`${message.author} **| Bir Sebep Girmelisin.**`)
    
    if (!sebep) return message.reply({embeds: [sebepp]});
      const row = new Discord.ActionRowBuilder()
      .addComponents(
new Discord.ButtonBuilder()
.setLabel("Evet")
.setStyle(Discord.ButtonStyle.Success)
.setCustomId("yes")
      )
.addComponents(
new Discord.ButtonBuilder()
.setLabel("Hayır")
.setStyle(Discord.ButtonStyle.Danger)
.setCustomId("now")
      )


      const emin = new EmbedBuilder()
      .setDescription(`${message.author} **| Afk Olmak İstediğine Emin Misin?**`)

message.reply({embeds: [emin], components: [row]}).then(msg => {
  msg.createMessageComponentCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {
    let interaction = button
      if (interaction.customId == "yes") {
  msg.delete()
    const evett = new EmbedBuilder()
    .setDescription(`${message.author} **| Başarıyla Afk Oldun.**`)
    
    message.channel.send({embeds: [evett]})
    db.set(`afk_${kullanıcı.id}`, sebep);
      }

    if (interaction.customId == "now") {
      msg.delete()
    }

  }
)


})
    
  
}
    
          
exports.conf = {
  aliases: []
};

exports.help = {
  name: "afk"
};
