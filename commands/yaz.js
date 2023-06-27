const { WebhookClient } = require('discord.js');

module.exports = {
  name: 'yaz',
  description: "Şaka yapmaya ne dersin?",
  options: [
    {
        name: "kişi",
        description: "Mesajın sahibi kim olsun?",
        type: 6,
        required: true
    },
    {
        name: "mesaj",
        description: "Mesajın ne olsun?",
        type: 3,
        required: true
    }
  ],

  run: async(client, interaction) => {

    const mesaj = interaction.options.getString("mesaj")
    const kişi = interaction.options.getMember("kişi")

    const webhookClient = await interaction.channel.createWebhook({
        name: kişi.user.username,
        avatar: kişi.user.displayAvatarURL({ dynamic: true })
    })

    await webhookClient.send({
      content: mesaj,
      username: kişi.user.username,
      avatarURL: kişi.user.displayAvatarURL({ format: "png", dynamic: true }),
    });

    await webhookClient.delete("Webhook kullanımı bitti");
  },
};