const { EmbedBuilder, PermissionsBitField, RoleSelectMenuBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const db = require("croxydb");

module.exports = {
  name: "afk",
  description: "Afk olursun.",
  type: 1,
  options: [
    {
        name: "sebep",
        description: "Afk olma sebebin nedir?",
        type: 3,
        required: false
    },
  ],

  run: async(client, interaction) => {
    
    await interaction.deferReply();

    const sebep = interaction.options.getString("sebep")
    const sistem = db.fetch(`afksistem_${interaction.user.id}`)

    const zatenafk = new EmbedBuilder()
    .setAuthor({ name: "Hata", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Zaten şuanda afk'dasın.`)

    if(sistem) return interaction.followUp({ embeds: [zatenafk], ephemeral: true })
    
    if(!sebep) {

        if(interaction.user.id === interaction.guild.ownerId) {
            
            db.set(`afksistem_${interaction.user.id}`, true)

            const nice = new EmbedBuilder()
            .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
            .setDescription(`Başarıyla afk oldun.`)
    
            interaction.followUp({ embeds: [nice] })
        }

        if(interaction.user.id != interaction.guild.ownerId) {
        db.set(`afksistem_${interaction.user.id}`, true)

        const nice = new EmbedBuilder()
        .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`Başarıyla afk oldun.`)

        interaction.member.setNickname(`[AFK] ${interaction.user.username}`)
        interaction.followUp({ embeds: [nice] })
        }
    }

    if(sebep) {

        if(interaction.user.id === interaction.guild.ownerId) {

            db.set(`afksistem_${interaction.user.id}`, sebep)
        
            const nice = new EmbedBuilder()
            .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
            .setDescription(`Başarıyla \`${sebep}\` sebebiyle afk oldun.`)
           
            interaction.followUp({ embeds: [nice] })
        }

        if(interaction.user.id != interaction.guild.ownerId) {

        db.set(`afksistem_${interaction.user.id}`, sebep)
        
        const nice = new EmbedBuilder()
        .setAuthor({ name: "Başarılı", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`Başarıyla \`${sebep}\` sebebiyle afk oldun.`)
       
        interaction.member.setNickname(`[AFK] ${interaction.user.username}`)
        interaction.followUp({ embeds: [nice] })
        }
    }
  }
}