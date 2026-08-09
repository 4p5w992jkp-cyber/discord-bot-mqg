const { Client, GatewayIntentBits } = require('discord.js');
const http = require('http');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot is running!');
}).listen(PORT, '0.0.0.0');

client.once('ready', () => {
  console.log('==============================');
  console.log('✅ BOT CONNECTED SUCCESSFULLY');
  console.log(`🤖 ${client.user.tag}`);
  console.log('==============================');
});

client.login(process.env.DISCORD_TOKEN)
  .then(() => console.log('🔑 Login successful'))
  .catch(error => console.error('❌ Login failed:', error));