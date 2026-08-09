const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const http = require('http');

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('يتأكد أن البوت شغال')
].map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

async function registerCommands() {
  await rest.put(
    Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
    { body: commands }
  );
  console.log('✅ تم تسجيل أوامر البوت');
}

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Discord Bot is online!');
}).listen(PORT, '0.0.0.0');

client.once('ready', async () => {
  console.log(`✅ البوت شغال: ${client.user.tag}`);

  try {
    await registerCommands();
  } catch (error) {
    console.error('❌ خطأ في تسجيل الأوامر:', error);
  }
});

client.login(TOKEN);