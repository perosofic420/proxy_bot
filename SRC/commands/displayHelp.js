const Discord = require('discord.js');

const displayHelp = (message) => {
    const embed = new Discord.MessageEmbed()
        .setTitle('Bot Commands')
        .setColor('#0099ff')
        .setDescription('List of available commands:')
        .addField('`ping`', 'Checks the bot\'s latency.')
        .addField('`level`', 'Displays your current level and points.')
        .addField('`board`', 'Shows the leaderboard of top users.')
        .addField('`yt`', 'Displays information about your YouTube channel.')
        .setFooter('Use the command prefix (,) followed by the command name to use these commands.');

    message.channel.send(embed).catch(console.error);
};

module.exports = displayHelp;
