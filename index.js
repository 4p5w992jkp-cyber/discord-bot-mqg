const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

client.commands = new Collection();

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
  client.user.setActivity("Server Protection", {
    type: 3
  });
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content === "!ping") {
    await message.reply(`🏓 Pong! ${client.ws.ping}ms`);
  }

  if (message.content === "!server") {
    await message.reply(
      `📊 **${message.guild.name}**\n` +
      `👥 Members: ${message.guild.memberCount}\n` +
      `🆔 ID: ${message.guild.id}`
    );
  }

  if (message.content === "!help") {
    await message.reply(
      `**🤖 أوامر البوت**\n\n` +
      `\`!ping\` - سرعة البوت\n` +
      `\`!server\` - معلومات السيرفر\n` +
      `\`!help\` - قائمة الأوامر`
    );
  }
});

// ضع التوكن في Environment Variables باسم DISCORD_TOKEN
client.login(process.env.DISCORD_TOKEN);