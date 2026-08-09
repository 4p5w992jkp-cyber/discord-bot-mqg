console.log("🔥 INDEX.JS STARTED");

const { Client, GatewayIntentBits } = require("discord.js");
const http = require("http");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const PORT = process.env.PORT || 3000;

http.createServer((req, res) => {
  res.writeHead(200);
  res.end("Discord Bot is online!");
}).listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Server running on port ${PORT}`);
});

client.once("ready", () => {
  console.log(`✅ BOT CONNECTED: ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log("🔑 LOGIN SUCCESSFUL");
  })
  .catch((error) => {
    console.error("❌ LOGIN FAILED:", error.message);
  });