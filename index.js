const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes
} = require("discord.js");

const general = require("./commands/general");
const moderation = require("./commands/moderation");
const protection = require("./commands/protection");
const tickets = require("./commands/tickets");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

const commands = [
  ...general,
  ...moderation,
  ...protection,
  ...tickets
];

client.commands = new Collection();

for (const command of commands) {
  client.commands.set(command.data.name, command);
}

client.once("ready", async () => {
  console.log(`✅ البوت شغال: ${client.user.tag}`);

  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_TOKEN
  );

  try {
    await rest.put(
      Routes.applicationGuildCommands(
        client.user.id,
        process.env.GUILD_ID
      ),
      {
        body: commands.map(command => command.data.toJSON())
      }
    );

    console.log("✅ تم تسجيل أوامر البوت");
  } catch (error) {
    console.error("❌ خطأ في تسجيل الأوامر:", error);
  }

  client.user.setActivity("Server Protection", {
    type: 3
  });
});

client.on("interactionCreate", async interaction => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: "❌ حدث خطأ أثناء تنفيذ الأمر.",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "❌ حدث خطأ أثناء تنفيذ الأمر.",
          ephemeral: true
        });
      }
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === "close_ticket") {
      await interaction.reply("🔒 سيتم إغلاق التذكرة...");

      setTimeout(async () => {
        try {
          await interaction.channel.delete();
        } catch (error) {
          console.error(error);
        }
      }, 2000);
    }
  }
});

client.login(process.env.DISCORD_TOKEN);