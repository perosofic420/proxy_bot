require('dotenv').config();
const { DISCORD_TOKEN } = process.env;
const { Discord, Client, Collection, GatewayIntentBits, EmbedBuilder, Routes, ActivityType, Partials, AttachmentBuilder } = require('discord.js');
const { REST } = require('@discordjs/rest');
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessages], partials: [Partials.Channel] });
client.commands = new Collection();
client.commandArray = [];
client.messageCommands = new Collection();
client.messageCommandArray = [];
client.colour = 0x0099ff;

const functionFolders = fs.readdirSync(`./functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./functions/${folder}`).filter(file => file.endsWith(".js"));
    for (const file of functionFiles) 
        require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(DISCORD_TOKEN);