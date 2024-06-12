const Discord = require('discord.js');
const config = require('../config.json');

const unban = async (message, args) => {
    const logChannelId = config.logChannelId;

    if (!message.member.hasPermission('BAN_MEMBERS')) {
        return message.reply("You don't have permission to unban members.");
    }

    const userIdToUnban = args[0];
    if (!userIdToUnban) {
        return message.reply("Please provide the User ID of the member to unban.");
    }

    try {
        const bans = await message.guild.fetchBans();
        const bannedUser = bans.get(userIdToUnban);
        if (!bannedUser) {
            return message.reply("This user is not banned.");
        }

        await message.guild.members.unban(userIdToUnban);
        message.reply(`Successfully unbanned ${bannedUser.user.tag}`);

        const logChannel = message.guild.channels.cache.get(logChannelId);
        if (logChannel) {
            const logEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('User Unbanned')
                .setDescription(`${bannedUser.user.tag} was unbanned by ${message.author.tag}.`)
                .setTimestamp();
            logChannel.send(logEmbed);
        }

        try {
            const invite = await message.channel.createInvite({ maxAge: 0, maxUses: 0 });
            await bannedUser.user.send(`You have been unbanned from ${message.guild.name}. You can rejoin using this invite link: ${invite.url}`);
        } catch (dmError) {
            console.error('Error sending DM to unbanned user:', dmError);
            message.channel.send(`Unbanned ${bannedUser.user.tag} successfully, but I couldn't send them a DM. They might have their DMs closed.`);
        }
    } catch (error) {
        console.error('Error unbanning the user:', error);
        message.reply("An error occurred while trying to unban the user.");
    }
};

module.exports = unban;
