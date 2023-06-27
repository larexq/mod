const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name: "sil",
    description: 'Belirtilen kanalda istediğin sayıda mesaj silersin.',
    type: 1,
    options: [
        {
            name: "sayı",
            description: "Silinecek mesaj sayısı?",
            type: 10,
            required: true
        },
        {
            name: "kanal",
            description: "Mesajlar hangi kanalda silinsin?",
            type: 7,
            channel_types: [0],
            required: false
        },
       
    ],
  run: async(client, interaction) => {

    const yetki = new EmbedBuilder()
    .setAuthor({ name: "Yetkin Yetmiyor", iconURL: interaction.member.displayAvatarURL() })
    .setDescription(`Bu komutu kullanabilmek için \`Mesajları Yönet\` yetkisine sahip olman gerekiyor.`)

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ embeds: [yetki] })

    const sayı = interaction.options.getNumber("sayı")
    const kanal = interaction.options.getChannel("kanal")

    if(kanal) {
        client.channels.cache.get(kanal.id).bulkDelete(sayı)
        
        const nice = new EmbedBuilder()
        .setAuthor({ name: "Silindi", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`\`${sayı}\` adet mesaj sildim.`)
        await client.channels.cache.get(kanal.id).send({ embeds: [nice] }).then(msg => setTimeout(() => msg.delete(), 5000))
        interaction.reply({ content: "Mesajları sildim.", ephemeral: true })
    }

    if(!kanal) {
        interaction.channel.bulkDelete(sayı)
        const nice = new EmbedBuilder()
        .setAuthor({ name: "Silindi", iconURL: interaction.member.displayAvatarURL() })
        .setDescription(`\`${sayı}\` adet mesaj sildim.`)
        await interaction.channel.send({ embeds: [nice] }).then(msg => setTimeout(() => msg.delete(), 5000))
        interaction.reply({ content: "Mesajları sildim.", ephemeral: true })
    }
}

};