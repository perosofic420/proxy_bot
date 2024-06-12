const Discord = require('discord.js');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const config = require('./config.json');
const displayHelp = require('./commands/displayHelp');
const displayLeaderboard = require('./commands/displayLeaderboard');
const getYoutubeChannelData = require('./commands/getYoutubeChannelData');
const handleLevelingSystem = require('./commands/handleLevelingSystem');
const ban = require('./commands/ban');
const kick = require('./commands/kick');
const mute = require('./commands/mute');
const unmute = require('./commands/unmute');
const unban = require('./commands/unban');
const unkick = require('./commands/unkick');
const purge = require('./commands/purge');
const cat = require('./commands/cat');
const configCommand = require('./commands/config');

const client = new Discord.Client();

if (!config.token || config.token === "YOUR_BOT_TOKEN_HERE") {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Enter your Discord bot token: ', (token) => {
        config.token = token;
        fs.writeFileSync(path.join(__dirname, 'config.json'), JSON.stringify(config, null, 2));
        client.login(token);
        rl.close();
    });
} else {
    client.login(config.token);
}

const levelsFilePath = path.join(__dirname, './data/levels.json');//done

//need to do
const mutedFilePath = path.join(__dirname, 'data', 'muted.json');
let mutedUsers = {};

if (fs.existsSync(mutedFilePath)) {
    mutedUsers = JSON.parse(fs.readFileSync(mutedFilePath, 'utf8'));
}

//done
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

//client/ready.js :)
client.once('ready', () => {
    console.log('Bot is ready and online!');
});

client.on('message', message => {
    if (message.author.bot) return;
    //replaced this stuff with interactions
    if (message.content.startsWith(config.prefix)) {
        handleCommands(message);
    } else {
        handleLevelingSystem(message, levelsData, levelsFilePath);//added same thing
    }
});

client.on('guildMemberAdd', member => {//done
    const channel = member.guild.channels.cache.get(config.welcomeChannelId);
    if (!channel) return;
    const welcomeEmbed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Welcome!')
        .setDescription(`${member} has joined the server. Welcome!`)
        .setTimestamp();
    channel.send(welcomeEmbed);
});

client.on('guildMemberRemove', member => {//done
    const channel = member.guild.channels.cache.get(config.goodbyeChannelId);
    if (!channel) return;
    const goodbyeEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('Goodbye!')
        .setDescription(`${member.displayName} has left the server.`)
        .setTimestamp();
    channel.send(goodbyeEmbed);
});

function handleCommands(message) {
    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'help') {//dont need
        displayHelp(message, args);
    } else if (command === 'ping') {//done
        const timeTaken = Date.now() - message.createdTimestamp;
        const pingEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Ping Response')
            .setDescription(`Pong! This message had a latency of ${timeTaken}ms.`);
        message.channel.send(pingEmbed);
    } else if (command === 'level') {//done
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
        getYoutubeChannelData(config.youtubeChannelId, message);
    } else if (command === 'board') {
        displayLeaderboard(client, message, levelsData);
    }
     else if (command === 'ban') {
        ban(message, args);
    }
     else if (command === 'kick') {
        kick(message, args);
    }
     else if (command === 'mute') {
        mute(message, args);
    }
     else if (command === 'unmute') {
        unmute(message, args);
    }
    else if (command === 'unban') {
        unban(message, args);
    }
    else if (command === 'unkick') {
        unkick(message, args);
    }
    else if (command === 'purge') {
        purge(message, args);
    }
    else if (command === 'cat') {
        cat(message, args);
    }
    else if (command === 'config') {
        configCommand(message, args);
    }
}

setInterval(async () => {
    const logChannelId = config.logChannelId;
    const muteRoleId = config.muteRoleId;

    for (const userId in mutedUsers) {
        const user = mutedUsers[userId];
        if (user.unmuteAt && user.unmuteAt < Date.now()) {
            const guildMember = client.guilds.cache
                .map(guild => guild.member(userId))
                .find(member => member);
            
            if (guildMember) {
                const muteRole = guildMember.guild.roles.cache.get(muteRoleId);
                if (muteRole) {
                    await guildMember.roles.remove(muteRole);

                    const logChannel = guildMember.guild.channels.cache.get(logChannelId);
                    if (logChannel) {
                        const logEmbed = new Discord.MessageEmbed()
                            .setColor('#00FF00')
                            .setTitle('User Unmuted')
                            .setDescription(`${guildMember.user.tag} was automatically unmuted after the mute duration ended.`)
                            .setTimestamp();

                        logChannel.send(logEmbed);
                    }
                }
                delete mutedUsers[userId];
            }
        }
    }
    fs.writeFileSync(path.join(__dirname, 'data', 'muted.json'), JSON.stringify(mutedUsers, null, 2));
}, 60000);
