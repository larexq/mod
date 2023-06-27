const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder, AuditLogEvent } = require("discord.js");
const Discord = require("discord.js");
const fs = require("fs")

const client = new Client({
    intents: Object.values(Discord.IntentsBitField.Flags),
    partials: Object.values(Partials)
});

const PARTIALS = Object.values(Partials);
const db = require("croxydb");
const config = require("./config.json");
const chalk = require("chalk");

global.client = client;
client.commands = (global.commands = []);
const { readdirSync } = require("fs");
const interactionCreate = require("./events/interactionCreate");
readdirSync('./commands').forEach(f => {
    if (!f.endsWith(".js")) return;

    const props = require(`./commands/${f}`);

    client.commands.push({
        name: props.name.toLowerCase(),
        description: props.description,
        options: props.options,
        dm_permission: false,
        type: 1
    });

    console.log(chalk.red`[COMMAND]` + ` ${props.name} komutu yüklendi.`)

});

readdirSync('./events').forEach(e => {

    const eve = require(`./events/${e}`);
    const name = e.split(".")[0];

    client.on(name, (...args) => {
        eve(client, ...args)
    });
    console.log(chalk.blue`[EVENT]` + ` ${name} eventi yüklendi.`)
});

client.login(config.token)

client.on("guildMemberAdd", async (member) => {
    const sistem = db.fetch(`otorolsistem_${member.guild.id}`)
    if(!sistem) return;

    if(member.user.bot) {

        if(!sistem.kanal) {
            member.roles.add(sistem.botrol)
        }
        if(sistem.kanal) {

            member.roles.add(sistem.botrol)
            const otorol = new EmbedBuilder()
            .setAuthor({ name: "Otorol Sistemi", iconURL: member.displayAvatarURL() })
            .setDescription(`${member} botuna <@&${sistem.botrol}> otorolü verildi.`)
            client.channels.cache.get(sistem.kanal).send({ embeds: [otorol] })
        }
    }
    else{
        if(!sistem.kanal) {
            member.roles.add(sistem.userrol)
        }

        if(sistem.kanal) {
            member.roles.add(sistem.userrol)
            const otorol = new EmbedBuilder()
            .setAuthor({ name: "Otorol Sistemi", iconURL: member.displayAvatarURL() })
            .setDescription(`${member} botuna <@&${sistem.userrol}> otorolü verildi.`)
            client.channels.cache.get(sistem.kanal).send({ embeds: [otorol] })
        }
    }
})

    client.on("guildMemberAdd", async (member) => {

        const sistem = db.fetch(`sayaçsistem_${member.guild.id}`)
        if(!sistem) return;

        const embed = new EmbedBuilder()
        .setAuthor({ name: "Sayaç Sistemi", iconURL: member.displayAvatarURL() })
        .setDescription(`${member} sunucuya katıldı!\nToplam \`${member.guild.memberCount}\` kişi olduk.\n\`${sistem.hedef}\` kişi olmamıza son \`${sistem.hedef - member.guild.memberCount}\` kişi kaldı.`)

        client.channels.cache.get(sistem.kanal).send({ embeds: [embed] })
    })

    client.on("guildMemberRemove", async (member) => {

        const sistem = db.fetch(`sayaçsistem_${member.guild.id}`)
        if(!sistem) return;

        const embed = new EmbedBuilder()
        .setAuthor({ name: "Sayaç Sistemi", iconURL: member.displayAvatarURL() })
        .setDescription(`${member} sunucudan ayrıldı.\nToplam \`${member.guild.memberCount}\` kişi kaldık.\n\`${sistem.hedef}\` kişi olmamıza son \`${sistem.hedef - member.guild.memberCount}\` kişi kaldı.`)

        client.channels.cache.get(sistem.kanal).send({ embeds: [embed] })
    })

    client.on("messageCreate", async message => {

        const sistem = db.fetch(`afksistem_${message.author.id}`)

        if (sistem) {
         
          db.delete(`afksistem_${message.author.id}`);

          if(message.member.id === message.guild.ownerId) {
            message.reply(`\`${message.member.user.username}\` kullanıcısı afk modundan çıktı.`);
          }
          if(message.member.id != message.guild.ownerId) {
          message.member.setNickname(message.member.user.username)
          message.reply(`\`${message.member.user.username}\` kullanıcısı afk modundan çıktı.`);
          }
        }
      
        var kullanıcı = message.mentions.users.first();
        if (!kullanıcı) return;
        var sistem2 = await db.get(`afksistem_${kullanıcı.id}`);

        if (sistem2) {
          message.reply(`Etiketlediğin kişi \`${sistem2.toString().replace("true", "Sebep Belirtilmemiş")}\` sebebiyle afk.`);
        }
      });
      
      client.on("messageCreate", async (message) => {

        const sistem = db.fetch(`otocevapsistem_${message.guild.id}`)
        const mesaj1 = db.fetch(`otocevapsistem_${message.guild.id}.mesaj1`)
        if(!sistem);

        if(!mesaj1) return;

        if(message.content === sistem.mesaj1) return message.reply({ content: sistem.mesaj2 })
      })