const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

const mutedFilePath = path.join(__dirname, '../data/muted.json');
let mutedUsers = {};

if (fs.existsSync(mutedFilePath)) {
    mutedUsers = JSON.parse(fs.readFileSync(mutedFilePath, 'utf8'));
}

const mute = async (message, args) => {
    const logChannelId = config.logChannelId;
    const muteRoleId = config.muteRoleId;

    if (!message.member.permissions.has(Discord.Permissions.FLAGS.MODERATE_MEMBERS)) {
        return message.reply("You don't have permission to timeout members.");
    }

    const userToMute = message.mentions.users.first();
    if (!userToMute) {
        return message.reply("Please mention a user to mute.");
    }

    const reason = args.slice(2).join(" ") || "No reason provided";
    const durationMatch = args[1] ? args[1].match(/^(\d+)(s|m|h|d)$/) : null;
    const duration = durationMatch ? parseDuration(durationMatch[1], durationMatch[2]) : null;

    const guildMember = message.guild.members.resolve(userToMute);
    if (!guildMember) {
        return message.reply("That user is not in this guild.");
    }

    const muteRole = message.guild.roles.cache.get(muteRoleId);
    if (!muteRole) {
        return message.reply("Mute role not found. Please check the role ID.");
    }

    try {
        await guildMember.roles.add(muteRole);
        message.reply(`${userToMute.tag} has been muted${duration ? ` for ${args[1]}` : ''}`);

        mutedUsers[userToMute.id] = { 
            unmuteAt: duration ? Date.now() + duration : null 
        };
        fs.writeFileSync(mutedFilePath, JSON.stringify(mutedUsers, null, 2));

        const logChannel = message.guild.channels.cache.get(logChannelId);
        if (logChannel) {
            const logEmbed = new Discord.MessageEmbed()
                .setColor('#808080')
                .setTitle('User Muted')
                .setDescription(`${userToMute.tag} has been muted.`)
                .addField('Muted By', message.author.tag)
                .addField('Reason', reason)
                .addField('Duration', duration ? args[1] : 'Indefinitely')
                .setTimestamp();

            logChannel.send(logEmbed);
        } else {
            console.error('Log channel not found');
        }
    } catch (error) {
        console.error('Error muting the user:', error);
        message.reply("An error occurred while trying to mute the user.");
    }
};

function parseDuration(amount, type) {
    const types = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    return amount * types[type];
}

module.exports = mute;
