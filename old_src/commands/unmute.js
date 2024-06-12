const Discord = require('discord.js');
const path = require('path');
const config = require('../config.json');

const unmute = async (message, args) => {
    const muteRoleId = config.muteRoleId;
    const logChannelId = config.logChannelId;

    if (!message.member.permissions.has(Discord.Permissions.FLAGS.MODERATE_MEMBERS)) {
        return message.reply("You don't have permission to unmute members.");
    }

    const userIdToUnmute = args[0];
    if (!userIdToUnmute) {
        return message.reply("Please provide the User ID of the member to unmute.");
    }

    try {
        const guildMember = await message.guild.members.fetch(userIdToUnmute);
        const muteRole = message.guild.roles.cache.get(muteRoleId);
        const logChannel = message.guild.channels.cache.get(logChannelId);

        if (!muteRole) {
            return message.reply("Mute role not found. Please check the role ID.");
        }

        if (!guildMember.roles.cache.has(muteRoleId)) {
            return message.reply("This user is not muted.");
        }

        await guildMember.roles.remove(muteRole);
        message.reply(`${guildMember.user.tag} has been unmuted.`);

        if (logChannel) {
            const logEmbed = new Discord.MessageEmbed()
                .setColor('#00FF00')
                .setTitle('User Unmuted')
                .setDescription(`${guildMember.user.tag} was unmuted by ${message.author.tag}.`)
                .setTimestamp();

            logChannel.send(logEmbed);
        }
    } catch (error) {
        console.error('Error unmuting the user:', error);
        message.reply("An error occurred while trying to unmute the user.");
    }
};

module.exports = unmute;
