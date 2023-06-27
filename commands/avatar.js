const {  EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name: "avatar",
    description: 'Belirttiğin kullanıcının avatarına bakarsınız.',
    type: 1,
    options: [
        {
            name: "kullanıcı",
            description: "Avatarına bakmak istediğin kullanıcı belirt.",
            type: 6,
            required: true
        }
      
    ],
  run: async(client, interaction) => {

    const user = interaction.options.getMember('kullanıcı')

    const embed = new EmbedBuilder()
    .setDescription(`Kullanıcın avatarı işte burda:`)
    .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))

    interaction.reply({ embeds: [embed] })
}

};