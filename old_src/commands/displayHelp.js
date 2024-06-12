const Discord = require('discord.js');

module.exports = (message, args) => {
    const embed = new Discord.MessageEmbed()
        .setTitle('Bot Commands')
        .setColor('#0099ff');

    if (args.length === 0) {
        embed.setDescription('List of available commands:')
            .addField('`,help`', 'Displays this help message.')
            .addField('`,ping`', 'Checks the bot\'s latency.')
            .addField('`,level`', 'Displays your current level and points.')
            .addField('`,board`', 'Shows the leaderboard of top users.')
            .addField('`,yt`', 'Displays information about your YouTube channel.')
            .addField('`,ban @user [reason]`', 'Bans a user from the server.')
            .addField('`,unban userID`', 'Unbans a user from the server.')
            .addField('`,kick @user [reason]`', 'Kicks a user from the server.')
            .addField('`,unkick userID`', 'Sends an invite back to a kicked user.')
            .addField('`,mute @user [duration]`', 'Mutes a user for a specified duration or indefinitely.')
            .addField('`,unmute userID`', 'Unmutes a user.')
            .addField('`,purge`', 'Deletes a specified number of messages. Usage: `,purge number` or `,purge @user number`.')
            .addField('`,cat`', 'Fetches and embeds a picture of a random cat.')
            .addField('`,config`', 'Configures bot settings. Usage: `,config option value`.')
            .setFooter('Use the command prefix (,) followed by the command name to use these commands.');
    } else {
        const command = args[0].toLowerCase();
        switch (command) {
            case 'ping':
                embed.setDescription('Checks the bot\'s latency.')
                    .addField('Usage', '`,ping`');
                break;
            case 'level':
                embed.setDescription('Displays your current level and points.')
                    .addField('Usage', '`,level`');
                break;
            case 'board':
                embed.setDescription('Shows the leaderboard of top users.')
                    .addField('Usage', '`,board`');
                break;
            case 'yt':
                embed.setDescription('Displays information about the RealProxyModz YouTube channel.')
                    .addField('Usage', '`,yt`');
                break;
            case 'ban':
                embed.setDescription('Bans a user from the server.')
                    .addField('Usage', '`,ban @user [reason]`');
                break;
            case 'unban':
                embed.setDescription('Unbans a user from the server.')
                    .addField('Usage', '`,unban userID`');
                break;
            case 'kick':
                embed.setDescription('Kicks a user from the server.')
                    .addField('Usage', '`,kick @user [reason]`');
                break;
            case 'unkick':
                embed.setDescription('Sends an invite back to a kicked user.')
                    .addField('Usage', '`,unkick userID`');
                break;
            case 'mute':
                embed.setDescription('Mutes a user for a specified duration or indefinitely.')
                    .addField('Usage', '`,mute @user [duration]`');
                break;
            case 'unmute':
                embed.setDescription('Unmutes a user.')
                    .addField('Usage', '`,unmute userID`');
                break;
            case 'purge':
                embed.setDescription('Deletes a specified number of messages.')
                    .addField('Usage', '`,purge number` or `,purge @user number`');
                break;
            case 'cat':
                embed.setDescription('Fetches and embeds a picture of a random cat.')
                    .addField('Usage', '`,cat`');
                break;
            case 'config':
                embed.setDescription('Configures bot settings.')
                    .addField('Usage', '`,config option value`')
                    .addField('Options', '`prefix`, `logchannel`, `muterole`, `welcomechannel`, `goodbyechannel`, `youtubeapikey`, `youtubechannelid`, `catapikey`');
                break;
            default:
                embed.setDescription(`No specific help available for the command: ${command}`);
                break;
        }
    }

    message.channel.send(embed).catch(console.error);
};
