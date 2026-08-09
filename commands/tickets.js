const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName("ticket")
      .setDescription("إنشاء تذكرة دعم"),

    async execute(interaction) {
      const channel = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
          {
            id: interaction.guild.roles.everyone.id,
            deny: ["ViewChannel"]
          },
          {
            id: interaction.user.id,
            allow: ["ViewChannel", "SendMessages", "ReadMessageHistory"]
          }
        ]
      });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("close_ticket")
          .setLabel("🔒 إغلاق التذكرة")
          .setStyle(ButtonStyle.Danger)
      );

      await channel.send({
        content: `🎫 مرحباً <@${interaction.user.id}>\nاكتب مشكلتك هنا وسيتم مساعدتك.`,
        components: [row]
      });

      await interaction.reply({
        content: `✅ تم إنشاء التذكرة: ${channel}`,
        ephemeral: true
      });
    }
  }
];