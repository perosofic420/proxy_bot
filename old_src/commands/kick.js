const Discord = require('discord.js');

const kick = async (message, args) => {
    const logChannelId = config.logChannelId;

    if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply("You don't have permission to kick members.");
    }

    const userToKick = message.mentions.users.first();
    if (!userToKick) {
        return message.reply("Please mention a user to kick.");
    }

    const reason = args.slice(1).join(" ") || "No reason provided";

    if (!message.guild.members.resolve(userToKick)) {
        return message.reply("That user is not in this guild.");
    }

    try {
        await message.guild.members.kick(userToKick, { reason });

        message.reply(`Successfully kicked ${userToKick.tag} for: ${reason}`);

        const logChannel = message.guild.channels.cache.get(logChannelId);
        if (logChannel) {
            const logEmbed = new Discord.MessageEmbed()
                .setColor('#FFA500')
                .setTitle('User Kicked')
                .setDescription(`${userToKick.tag} has been kicked.`)
                .addField('Kicked By', message.author.tag)
                .addField('Reason', reason)
                .setTimestamp();

            logChannel.send(logEmbed);
        } else {
            console.error('Log channel not found');
        }
    } catch (error) {
        console.error(error);
        message.reply("An error occurred while trying to kick the user.");
    }
};

module.exports = kick;
