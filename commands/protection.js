const {
  SlashCommandBuilder,
  PermissionFlagsBits
} = require("discord.js");

module.exports = [
  {
    data: new SlashCommandBuilder()
      .setName("lock")
      .setDescription("قفل القناة الحالية")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
      await interaction.channel.permissionOverwrites.edit(
        interaction.guild.roles.everyone,
        {
          SendMessages: false
        }
      );

      await interaction.reply("🔒 تم قفل القناة.");
    }
  },

  {
    data: new SlashCommandBuilder()
      .setName("unlock")
      .setDescription("فتح القناة الحالية")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction) {
      await interaction.channel.permissionOverwrites.edit(
        interaction.guild.roles.everyone,
        {
          SendMessages: null
        }
      );

      await interaction.reply("🔓 تم فتح القناة.");
    }
  }
];