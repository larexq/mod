const { EmbedBuilder, PermissionsBitField, InteractionCollector } = require("discord.js");
const db = require("croxydb");
const ms = require("ms")

module.exports = {
    name: "timeout",
    description: 'Belirtilen kullanıcıyı zamanaşımı atar.',
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Zaman aşımı atılacak kullanıcıyı seçin.",
            type: 6,
            required: true
        },
        {
            name: "zaman",
            description: "İngilizce zamanı giriniz. (10s/10h/10d)",
            type: 3,
            required: true
        },
        {
            name: "sebep",
            description: "Bir sebep belirt.",
            type: 3,
            required: false
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

        if(interaction.guild.members.cache.has(kullanıcı.id) && interaction.member.roles.highest.position <= interaction.guild.members.cache.get(kullanıcı.id).roles.highest.position && interaction.user.id != interaction.guild.ownerId) return interaction.reply({ embeds: [yetki2] })

        const me = interaction.guild.members.cache.get(client.user.id);

        const yetki3 = new EmbedBuilder()
        .setAuthor({ name: "Yetkim Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`Bu kullanıcıyı banlayamıyorum.`)

        if(kullanıcı.roles.highest.position >= me.roles.highest.position) return interaction.reply({ embeds: [yetki3] })
        const zaman = interaction.options.getString("zaman")

        const süre = ms(zaman)

        if(!sebep) {
            await kullanıcı.timeout(süre).catch((e) => {
                return interaction.reply({ content: `Bir hata oluştu: ${e}` })
            })

            const nice = new EmbedBuilder()
            .setAuthor({ name: `Zaman Aşımı`, iconURL: kullanıcı.displayAvatarURL() })
            .setDescription(`Susturulan Kullanıcı: ${kullanıcı}
            Susturan Yetkili: ${interaction.user}
            Süre: \`${ms(ms(süre))}\``)
            .setTimestamp()
            .setFooter({ text: `Sebep belirtilmemiş.` })
            interaction.reply({ embeds: [nice] })
        }

        if(sebep) {
            await kullanıcı.timeout(süre).catch((e) => {
                return interaction.reply({ content: `Bir hata oluştu: ${e}` })
            })

            const nice = new EmbedBuilder()
            .setAuthor({ name: `Zaman Aşımı`, iconURL: kullanıcı.displayAvatarURL() })
            .setDescription(`Susturulan Kullanıcı: ${kullanıcı}
            Susturan Yetkili: ${interaction.user}
            Süre: \`${ms(ms(zaman))}\``)
            .setTimestamp()
            .setFooter({ text: `${sebep} sebebiyle atılmış.` })
            interaction.reply({ embeds: [nice] })
        }
    }
}