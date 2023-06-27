const { EmbedBuilder, PermissionsBitField, InteractionCollector } = require("discord.js");
const db = require("croxydb");

module.exports = {
    name: "unban",
    description: 'Belirtilen kullanıcı idsini sunucu yasağını kaldırır.',
    type: 1,
    options: [
        {
            name: "kullanıcı-id",
            description: "Yasağı kaldırılacak kullanıcının idsi.",
            type: 3,
            required: true
        }
    ],
    run: async (client, interaction) => {

        const yetki = new EmbedBuilder()
        .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`Bu komutu kullanabilmek için \`Üyeleri Yasakla\` yetkisine sahip olman gerekiyor.`)

        if(interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ embeds: [yetki] })

        const kullanıcı = interaction.options.getString("kullanıcı-id");

        const ban = await client.fetchBan(interaction.guild, kullanıcı);
        
        const zatenbanli = new EmbedBuilder()
        .setAuthor({ name: "Zaten Banlı", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`Belirttiğin kullanıcı idsi sunucudan zaten yasaklanmış.`)
        
        if(!ban) return interaction.reply({ embeds: [zatenbanli] })

        const user = client.users.cache.get(kullanıcı)

        const nice = new EmbedBuilder()
        .setAuthor({ name: "Kullanıcının banı kaldırıldı!", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`${user} -  (\`${kullanıcı}\`) kullanıcısının yasağı kaldırıldı.`)

        interaction.guild.members.unban(kullanıcı)

        interaction.reply({ embeds: [nice] })
     }
}