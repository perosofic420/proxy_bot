const Discord = require('discord.js');
const config = require('../config.json');

const ban = async (message, args) => {
    const logChannelId = config.logChannelId;

    if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.reply("You don't have permission to ban members.");
    }

    const userToBan = message.mentions.users.first();
    if (!userToBan) {
        return message.reply("Please mention a user to ban.");
    }

    const reason = args.slice(1).join(" ") || "No reason provided";

    if (!message.guild.members.resolve(userToBan)) {
        return message.reply("That user is not in this guild.");
    }

    try {
        await message.guild.members.ban(userToBan, { reason });
        message.reply(`Successfully banned ${userToBan.tag} for: ${reason}`);

        const logChannel = message.guild.channels.cache.get(logChannelId);
        if (logChannel) {
            const logEmbed = new Discord.MessageEmbed()
                .setColor('#FF0000')
                .setTitle('User Banned')
                .setDescription(`${userToBan.tag} has been banned.`)
                .addField('Banned By', message.author.tag)
                .addField('Reason', reason)
                .setTimestamp();

            logChannel.send(logEmbed);
        } else {
            console.error('Log channel not found');
        }
    } catch (error) {
        console.error(error);
        message.reply("An error occurred while trying to ban the user.");
    }
};

module.exports = ban;
