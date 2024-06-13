const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban someone from the server.')
        .addIntegerOption(option => option.setName('id').setDescription('Give the ID of someone to unban')),
    async execute(interaction, client) {
        if (!interaction.user.hasPermission('BAN_MEMBERS')) {
            return interaction.reply("You don't have permission to unban members.");
        }
    
        const userIdToUnban = interaction.options.getInterger('id');
        if (!userIdToUnban) {
            return interaction.reply("Please provide the User ID of the member to unban.");
        }
    
        try {
            const bans = await interaction.guild.fetchBans();
            const bannedUser = bans.get(userIdToUnban);
            if (!bannedUser) {
                return interaction.reply("This user is not banned.");
            }
    
            await interaction.guild.members.unban(userIdToUnban);
            interaction.reply(`Successfully unbanned ${bannedUser.user.tag}`);
    
            const logChannel = interaction.guild.channels.cache.get(logChannelId);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setTitle('User Unbanned')
                    .setDescription(`${bannedUser.user.tag} was unbanned by ${interaction.author.tag}.`)
                    .setTimestamp();
                logChannel.send(logEmbed);
            }
    
            try {
                const invite = await interaction.channel.createInvite({ maxAge: 0, maxUses: 0 });
                await bannedUser.user.send(`You have been unbanned from ${interaction.guild.name}. You can rejoin using this invite link: ${invite.url}`);
            } catch (dmError) {
                console.error('Error sending DM to unbanned user:', dmError);
                interaction.channel.send(`Unbanned ${bannedUser.user.tag} successfully, but I couldn't send them a DM. They might have their DMs closed.`);
            }
        } catch (error) {
            console.error('Error unbanning the user:', error);
            interaction.reply("An error occurred while trying to unban the user.");
        }
    }
}