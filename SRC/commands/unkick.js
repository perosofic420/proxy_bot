const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unkick')
        .setDescription('Send someone an invite back to the server')
        .addIntegerOption(option => option.setName('id').setDescription('Give the ID of someone to unban').setRequired(true)),
    async execute(interaction, client) {
        if (!interaction.member.hasPermission('KICK_MEMBERS')) {
            return interaction.reply("You don't have permission to send invite links.");
        }

        const userIdToUnkick = interaction.options.getInterger('id');
        if (!userIdToUnkick) {
            return interaction.reply("Please provide the User ID of the member to send an invite.");
        }
    
        try {
            const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 });
    
            try {
                const userToUnkick = await interaction.client.users.fetch(userIdToUnkick);
                await userToUnkick.send(`You have been invited back to ${interaction.guild.name}. Here is your invite link: ${invite.url}`);
                message.reply(`An invite has been sent to the user with ID: ${userIdToUnkick}`);
            } catch (dmError) {
                console.error('Error sending DM:', dmError);
                message.reply(`Could not send a DM. Here is an invite link for the user: ${invite.url}`);
            }
        } catch (error) {
            console.error('Error creating an invite:', error);
            message.reply("An error occurred while trying to create an invite link.");
        }
    }
}