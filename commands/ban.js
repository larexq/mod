const { EmbedBuilder, PermissionsBitField, InteractionCollector } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "ban",
    description: 'Belirtilen kullanıcıyı sunucudan yasaklar.',
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Banlanacak kullanıcıyı seçin.",
            type: 6,
            required: true
        },
        {
            name: "sebep",
            description: "Bir sebep belirt.",
            type: 3,
            required: true
        },
    ],
    run: async (client, interaction) => {

        const yetki = new EmbedBuilder()
        .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`Bu komutu kullanabilmek için \`Üyeleri Yasakla\` yetkisine sahip olman gerekiyor.`)

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ embeds: [yetki] })

        const kullanıcı = interaction.options.getMember("kullanıcı");
        const sebep = interaction.options.getString("sebep");

        const yetki2 = new EmbedBuilder()
        .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`Kendinle aynı yetkide ya da üst yetkide olan birini banlayamazsın.`)

        if(interaction.guild.members.cache.has(kullanıcı.id) && interaction.member.roles.highest.position <= interaction.guild.members.cache.get(kullanıcı.id).roles.highest.position) return interaction.reply({ embeds: [yetki2] })
    
        const yetki3 = new EmbedBuilder()
        .setAuthor({ name: "Yetkim Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`Bu üyeyi banlama yetkim yok.`)

        if(member && member.bannable) return interaction.reply({ embeds: [yetki3] })

        kullanıcı.send({ content: `**${interaction.guild.name}** sunucusundan, **${interaction.member.tag}** tarafından \`${sebep}\` sebebiyle banlandınız.` })
        interaction.guild.members.ban(kullanıcı.id, { reason: `${sebep} | Yetkili: ${interaction.member.tag}` })

        const nice = new EmbedBuilder()
        .setAuthor({ name: "Kullanıcı Banlandı!", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`${kullanıcı} kullanıcısı \`${sebep}\` sebebiyle ${interaction.member} tarafından sunucudan yasaklandı!`)

        interaction.reply({ embeds: [nice] })
     }
}
