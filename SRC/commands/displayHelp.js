const Discord = require('discord.js');

const displayHelp = (message) => {
    const embed = new Discord.MessageEmbed()
        .setTitle('Bot Commands')
        .setColor('#0099ff')
        .setDescription('List of available commands:')
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
        .setFooter('Use the command prefix (,) followed by the command name to use these commands.');

    message.channel.send(embed).catch(console.error);
};

module.exports = displayHelp;
