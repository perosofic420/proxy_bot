const Discord = require('discord.js');
const config = require('../config.json');

const purge = async (message, args) => {
    if (!message.member.permissions.has(Discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
        return message.reply("You don't have permission to manage messages.");
    }

    const amount = parseInt(args[0]);
    if (!amount || amount < 2 || amount > 1000) {
        return message.reply("Please specify a number of messages to delete.");
    }

    const user = message.mentions.users.first();
    const isUserSpecified = Boolean(user);
    let remainingMessages = amount;
    let statusMessage = null;

    while (remainingMessages > 0) {
        const limit = remainingMessages > 100 ? 100 : remainingMessages;
        let messages;
        try {
            messages = await message.channel.messages.fetch({ limit });
        } catch (fetchError) {
            console.error(fetchError);
            break;
        }
    
        const messagesToDelete = isUserSpecified ? messages.filter(m => m.author.id === user.id) : messages;
    
        let deletedCount = 0;
        try {
            const deleted = await message.channel.bulkDelete(messagesToDelete, true);
            deletedCount = deleted.size;
        } catch (deleteError) {
            if (deleteError.code !== 10008) {
                console.error(deleteError);
            }
        }
    
        remainingMessages -= deletedCount;
    
        if (remainingMessages > 0 && deletedCount > 0) {
            const timeRemaining = remainingMessages / 10;
            if (statusMessage) await statusMessage.delete().catch(console.error);
            statusMessage = await message.channel.send(`Deleting messages... ${remainingMessages} left. Approximate time remaining: ${timeRemaining.toFixed(1)} seconds.`);
            await new Promise(resolve => setTimeout(resolve, 10000));
        } else {
            break;
        }
    }

    if (statusMessage) await statusMessage.delete().catch(console.error);
    message.reply(`Finished deleting ${amount} message(s) ${isUserSpecified ? `from ${user.tag}` : ''}.`);

    const logChannel = message.guild.channels.cache.get(config.logChannelId);
    if (logChannel) {
        const logEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Messages Purged')
            .setDescription(`${amount} messages ${isUserSpecified ? `from ${user.tag}` : ''} were purged by ${message.author.tag}`)
            .setTimestamp();
        logChannel.send(logEmbed);
    }
};

module.exports = purge;
