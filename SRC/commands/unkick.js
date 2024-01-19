const Discord = require('discord.js');
const config = require('../config.json');

const unkick = async (message, args) => {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
        return message.reply("You don't have permission to send invite links.");
    }

    const userIdToUnkick = args[0];
    if (!userIdToUnkick) {
        return message.reply("Please provide the User ID of the member to send an invite.");
    }

    try {
        const invite = await message.channel.createInvite({ maxAge: 0, maxUses: 0 });

        try {
            const userToUnkick = await message.client.users.fetch(userIdToUnkick);
            await userToUnkick.send(`You have been invited back to ${message.guild.name}. Here is your invite link: ${invite.url}`);
            message.reply(`An invite has been sent to the user with ID: ${userIdToUnkick}`);
        } catch (dmError) {
            console.error('Error sending DM:', dmError);
            message.reply(`Could not send a DM. Here is an invite link for the user: ${invite.url}`);
        }
    } catch (error) {
        console.error('Error creating an invite:', error);
        message.reply("An error occurred while trying to create an invite link.");
    }
};

module.exports = unkick;
