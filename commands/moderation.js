const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName("kick")
      .setDescription("طرد عضو من السيرفر")
      .addUserOption(option =>
        option
          .setName("user")
          .setDescription("العضو")
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

    async execute(interaction) {
      const user = interaction.options.getUser("user");
      const member = await interaction.guild.members.fetch(user.id);

      if (!member.kickable) {
        return interaction.reply({
          content: "❌ ما أقدر أطرد هذا العضو.",
          ephemeral: true
        });
      }

      await member.kick(`By ${interaction.user.tag}`);
      await interaction.reply(`✅ تم طرد **${user.tag}**`);
    }
  },

  {
    data: new SlashCommandBuilder()
      .setName("ban")
      .setDescription("حظر عضو من السيرفر")
      .addUserOption(option =>
        option
          .setName("user")
          .setDescription("العضو")
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    async execute(interaction) {
      const user = interaction.options.getUser("user");
      const member = await interaction.guild.members.fetch(user.id);

      if (!member.bannable) {
        return interaction.reply({
          content: "❌ ما أقدر أحظر هذا العضو.",
          ephemeral: true
        });
      }

      await member.ban({
        reason: `By ${interaction.user.tag}`
      });

      await interaction.reply(`🔨 تم حظر **${user.tag}**`);
    }
  },

  {
    data: new SlashCommandBuilder()
      .setName("clear")
      .setDescription("حذف رسائل من القناة")
      .addIntegerOption(option =>
        option
          .setName("amount")
          .setDescription("عدد الرسائل")
          .setMinValue(1)
          .setMaxValue(100)
          .setRequired(true)
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),

    async execute(interaction) {
      const amount = interaction.options.getInteger("amount");

      await interaction.channel.bulkDelete(amount, true);

      await interaction.reply({
        content: `🧹 تم حذف ${amount} رسالة.`,
        ephemeral: true
      });
    }
  }
];