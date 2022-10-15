const { Client, GatewayIntentBits, Partials, EmbedBuilder, DiscordAPIError } = require("discord.js");
const config = require("./config.js");
const db = require("croxydb")
const ids = require("./ids.js")
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)
  if(interaction.customId == "evet") {
const db = require("croxydb")
db.push(`evet_${interaction.message.id}`, interaction.user.id)
interaction.reply({content: "Başarıyla Oyunu **Evet** Olarak Verdin!", ephemeral: true})

const evet = db.get(`evet_${interaction.message.id}`).length;
const hayir = db.get(`hayir_${interaction.message.id}`).length;
const aciklama = db.get(`oylama_${interaction.message.id}`)
const embed = new EmbedBuilder()
.setTitle("Godzilla - Oylama Sistemi!")
.setDescription(`Oylama: **${aciklama}**\n\nEvet: **${evet}**\n\nHayır: **${hayir}**`)
.setColor("#ff0000")
await message.edit({embeds: [embed]})
  }
});
client.on('interactionCreate', async (interaction) => {
	if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)
  if(interaction.customId == "hayır") {
const db = require("croxydb")
db.push(`hayir_${interaction.message.id}`, interaction.user.id)
interaction.reply({content: "Başarıyla Oyunu **Hayır** Olarak Verdin!", ephemeral: true})

const evet = db.get(`evet_${interaction.message.id}`).length;
const hayir = db.get(`hayir_${interaction.message.id}`).length;
const aciklama = db.get(`oylama_${interaction.message.id}`)
const embed = new EmbedBuilder()
.setTitle("Godzilla - Oylama Sistemi!")
.setDescription(`Oylama: **${aciklama}**\n\nEvet: **${evet}**\n\nHayır: **${hayir}**`)
.setColor("#ff0000")
await message.edit({embeds: [embed]})
  }
});

client.on("messageCreate", async message => {
  const db = require("croxydb");

  if (await db.get(`afk_${message.author.id}`)) {
   
    db.delete(`afk_${message.author.id}`);

const noafk = new EmbedBuilder()
.setDescription(`${message.author} Artık Afk Değilsin.`)

    message.channel.send({embeds: [noafk]});
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.get(`afk_${kullanıcı.id}`);

const afkbu = new EmbedBuilder()
.setDescription(`Bu Kullanıcı \`${sebep}\` Sebebiyle Afk.`)


  if (sebep) {
    message.reply({embeds: [afkbu]});
  }
});

/*client.on("messageCreate", (message) => {
  const db = require("croxydb")
  
  const kufurler = [
    
    "amk",
    "piç",
    "yarrak",
    "oç",
    "göt",
    "amq",
    "yavşak",
    "amcık",
    "amcı",
    "orospu",
    "sikim",
    "sikeyim",
    "aq",
    "mk"
       
  ]
  
if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`<a:police:1030774903252725820> Hey <@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif!`)
}
}
)
client.on("messageCreate", (message) => {
  const db = require("croxydb")


  const linkler = [
    
    ".com.tr",
    ".net",
    ".org",
    ".tk",
    ".cf",
    ".gf",
    "https://",
    ".gq",
    "http://",
    ".com",
    ".gg",
    ".porn",
    ".edu"
       
  ]
  
if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`<a:police:1030774903252725820> Hey <@${message.author.id}>, Bu Sunucuda Reklam Engel Sistemi Aktif!`)
}
}
)*/

client.on('guildMemberAdd', async member => {

  let kalan = ids.hedefsayi - member.guild.memberCount || '?'
  if(!kalan) return;
  let kanal = ids.kanalSayac
  
  client.channels.cache.get(kanal).send("Hoşgeldin **"+member.user.username+"** Seninle Beraber `"+member.guild.memberCount+"` Kişi Olduk, `"+ids.hedefsayi+"` Kişi Olmamıza Son `"+kalan+"` Kişi Kaldı!")
  
});
client.on('guildMemberRemove', async member => {
  
  let kanal2 = ids.kanalSayac
  
  client.channels.cache.get(kanal2).send("Görüşürüz **"+member.user.username+"**, `"+member.guild.memberCount+"` Kişi Kaldık!")
  
});

client.on('guildMemberAdd', async member => {
  
let kanal = ids.kanalOtorol
let rol = ids.rolOtorol

  client.channels.cache.get(kanal).send(`**`+member.user.tag+`** Kullanıcı Katıldı, Gerekli Rolü Verdim.`)
  member.roles.add(rol).catch(() => {})
  
});


client.on("messageCreate", (message) => {
  

  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){

message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin <a:hi:1030774331837526036>`)
}
}
)


/*client.on("guildMemberAdd", async member => {
  member.setNickname(`${ids.tag} ${member.user.username}`)
})*/

client.login(config.token)