const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick someone from the server.')
        .addMentionableOption(option => option.setName('mention').setDescription('Mention someone to kick')),
    async execute(interaction, client) {
        if (!interaction.user.hasPermission('KICK_MEMBERS')) {
            return interaction.reply("You don't have permission to kick members.");
        }
    
        const userToKick = interaction.options.getMentionable('mention');
        if (!userToKick) {
            return interaction.reply("Please mention a user to kick.");
        }
    
        const reason = args.slice(1).join(" ") || "No reason provided";
    
        if (!interaction.guild.members.resolve(userToKick)) {
            return interaction.reply("That user is not in this guild.");
        }
    
        try {
            await interaction.guild.members.kick(userToKick, { reason });
    
            interaction.reply(`Successfully kicked ${userToKick.tag} for: ${reason}`);
    
            const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setColor('#FFA500')
                    .setTitle('User Kicked')
                    .setDescription(`${userToKick.tag} has been kicked.`)
                    .addField('Kicked By', interaction.author.tag)
                    .addField('Reason', reason)
                    .setTimestamp();
    
                logChannel.send({ embeds: [logEmbed] });
            } else {
                console.error('Log channel not found');
            }
        } catch (error) {
            console.error(error);
            message.reply("An error occurred while trying to kick the user.");
        }
    }
}