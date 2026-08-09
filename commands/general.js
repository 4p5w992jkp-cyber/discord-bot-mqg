const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("يعرض سرعة البوت"),

    async execute(interaction) {
      await interaction.reply(`🏓 Pong! ${interaction.client.ws.ping}ms`);
    }
  },

  {
    data: new SlashCommandBuilder()
      .setName("server")
      .setDescription("يعرض معلومات السيرفر"),

    async execute(interaction) {
      const guild = interaction.guild;

      const embed = new EmbedBuilder()
        .setTitle(`📊 ${guild.name}`)
        .addFields(
          {
            name: "👥 الأعضاء",
            value: `${guild.memberCount}`,
            inline: true
          },
          {
            name: "🆔 Server ID",
            value: guild.id,
            inline: true
          }
        );

      await interaction.reply({ embeds: [embed] });
    }
  },

  {
    data: new SlashCommandBuilder()
      .setName("user")
      .setDescription("يعرض معلوماتك"),

    async execute(interaction) {
      const user = interaction.user;

      await interaction.reply(
        `👤 **${user.username}**\n🆔 ${user.id}\n📅 <t:${Math.floor(
          user.createdTimestamp / 1000
        )}:R>`
      );
    }
  }
];