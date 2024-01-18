const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const displayHelp = require('./commands/displayHelp');
const displayLeaderboard = require('./commands/displayLeaderboard');
const getYoutubeChannelData = require('./commands/getYoutubeChannelData');
const handleLevelingSystem = require('./commands/handleLevelingSystem');

const client = new Discord.Client();

const levelsFilePath = path.join(__dirname, './data/levels.json');

let levelsData = {};
if (fs.existsSync(levelsFilePath)) {
    const fileContent = fs.readFileSync(levelsFilePath, 'utf8');
    try {
        if (fileContent) {
            levelsData = JSON.parse(fileContent);
        }
    } catch (error) {
        console.error("Error parsing JSON from levels file: ", error);
        levelsData = {};
    }
}

client.once('ready', () => {
    console.log('Bot is ready and online!');
});

client.on('message', message => {
    if (message.author.bot) return;
    
    if (message.content.startsWith(config.prefix)) {
        handleCommands(message);
    } else {
        handleLevelingSystem(message, levelsData, levelsFilePath);
    }
});

function handleCommands(message) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'help') {
        displayHelp(message);
    } else if (command === 'ping') {
        const timeTaken = Date.now() - message.createdTimestamp;
        const pingEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ping Response')
            .setDescription(`Pong! This message had a latency of ${timeTaken}ms.`);
        message.channel.send(pingEmbed);
    } else if (command === 'level') {
        const userId = message.author.id;
        if (!levelsData[userId]) {
            const levelEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Level Status')
                .setDescription("You do not have any level data yet. Keep participating to start leveling up!");
            message.channel.send(levelEmbed);
            return;
        }
    
        const userLevelData = levelsData[userId];
        const levelEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Your Level Information')
            .setDescription(`You are currently at level ${userLevelData.level} with ${userLevelData.points} points.`);
        message.channel.send(levelEmbed);
    } else if (command === 'yt') {
        getYoutubeChannelData('YOUTUBE_CHANNEL_ID_HERE', message);
    } else if (command === 'board') {
        displayLeaderboard(client, message, levelsData);
    }
}

client.login(config.token);
