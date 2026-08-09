const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Port لـ Render
const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Discord Bot is online!');
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Web server running on port ${PORT}`);
});

client.once('ready', () => {
  console.log(`✅ البوت شغال: ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);