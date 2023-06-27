const { CommandInteraction, EmbedBuilder, PermissionsBitField, StringSelectMenuBuilder } = require('discord.js');
const config = require('../config.json');
const db = require("croxydb")

module.exports = {
    name: 'öneri-kanal',
    description: 'Öneri kanalı ayarla.',
    options: [
      {
        name: 'kanal',
        type: 7,
        channel_types: [0],
        description: 'Öneri yapıldığında log atılmasını istediğin kanal.',
        required: true
      }
    ],
    run: async(client, interaction) => {

    const kanal = interaction.options.getChannel("kanal");

    if(interaction.user.id != config.developer) return interaction.reply({ content: "Bu komutu sadece sahibim kullanabilir.", ephemeral: true })

    const sistem = db.fetch(`önerisistem`)

    if(sistem) {
        db.delete(`önerisistem`)
        db.set(`önerisistem`, kanal.id)
        interaction.reply({ content: "Öneri kanalı <#"+kanal+"> olarak ayarlandı.", ephemeral: true });
    } 

    if(!sistem) {
    db.set(`önerisistem`, kanal.id)

    interaction.reply({ content: "Öneri kanalı <#"+kanal+"> olarak ayarlandı.", ephemeral: true });
    }
  }
};