const { EmbedBuilder, PermissionsBitField, InteractionCollector } = require("discord.js");
const db = require("croxydb");
const ms = require("ms")

module.exports = {
    name: "untimeout",
    description: 'Belirtilen kullanıcının zamanaşımını kaldırır.',
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Zaman aşımı kaldırılacak kullanıcıyı seçin.",
            type: 6,
            required: true
        }
    ],
    run: async (client, interaction) => {

        const yetki = new EmbedBuilder()
        .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`Bu komutu kullanabilmek için \`Üyeleri Yasakla\` yetkisine sahip olman gerekiyor.`)

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ embeds: [yetki] })

        const me = interaction.guild.members.cache.get(client.user.id);
        const kullanıcı = interaction.options.getMember("kullanıcı");

        const yetki2 = new EmbedBuilder()
        .setAuthor({ name: `Timeout Kaldırma`, iconURL: kullanıcı.displayAvatarURL() })
        .setDescription(`${kullanıcı} Bu kullanıcının susturulması kaldırılamaz veya sizden daha yüksek bir yetkide.`)

        if (kullanıcı.roles.highest.position >= interaction.member.roles.highest.position || kullanıcı.roles.highest.position >= me.roles.highest.position) return interaction.reply({ embeds: [yetki2] })

        await kullanıcı.timeout(1000).catch((e) => {
            return interaction.reply({ content: `Bir hata oluştu: ${e}` })
          })
          
          const embed = new EmbedBuilder()
            .setAuthor({ name: `Timeout Kaldırma`, iconURL: kullanıcı.displayAvatarURL() })
            .setDescription(`Susturulması Kaldırılan Kullanıcı: ${kullanıcı}
            Susturmayı Kaldıran Yetkili: ${interaction.user}`)
            .setTimestamp()
        
          interaction.reply({ embeds: [embed] });
    }
}