const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '../config.json');
let config = require(configPath);

module.exports = async (message, args) => {
    if (!message.member.hasPermission('ADMINISTRATOR')) {
        return message.reply('You need administrator permissions to use this command.');
    }

    try {
        await message.delete();
    } catch (err) {
        console.error('Error deleting message:', err);
    }

    let embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Configuration Update');

    switch (args[0]) {
        case 'prefix':
            const newPrefix = args[1];
            if (!newPrefix) {
                embed.setDescription('Please provide a new prefix.');
                message.channel.send(embed);
                return;
            }
            config.prefix = newPrefix;
            embed.setDescription(`Prefix updated to ${newPrefix}`);
            break;
        case 'logchannel':
            config.logChannelId = args[1];
            embed.setDescription(`Log channel updated to ${args[1]}`);
            break;
        case 'muterole':
            config.muteRoleId = args[1];
            embed.setDescription(`Mute role updated to ${args[1]}`);
            break;
        case 'welcomechannel':
            config.welcomeChannelId = args[1];
            embed.setDescription(`Welcome channel updated to ${args[1]}`);
            break;
        case 'goodbyechannel':
            config.goodbyeChannelId = args[1];
            embed.setDescription(`Goodbye channel updated to ${args[1]}`);
            break;
        case 'youtubeapikey':
            config.youtubeApiKey = args[1];
            embed.setDescription(`YouTube API key updated successfully.`);
            break;
        case 'youtubechannelid':
            config.youtubeChannelId = args[1];
            embed.setDescription(`YouTube channel ID updated successfully.`);
            break;
        case 'catapikey':
            config.catApiKey = args[1];
            embed.setDescription(`Cat API key updated successfully.`);
            break;
        default:
            embed.setDescription('Invalid configuration option.');
            message.channel.send(embed);
            return;
    }

    saveConfig();
    message.channel.send(embed);

    function saveConfig() {
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf8');
        console.log("Configuration updated, restarting the bot...");
        process.exit(0);
    }
};
