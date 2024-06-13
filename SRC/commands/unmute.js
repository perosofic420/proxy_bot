const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute')
        .setDescription('Unmute someone in the server.')
        .addMentionableOption(option => option.setName('mention').setDescription('Mention someone to unmute').setRequired(true)),
    async execute(interaction, client) {
        if (!interaction.user.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply("You don't have permission to unmute members.");
        }
    
        const userIdToUnmute = interaction.options.getMentionable('mention');
        if (!userIdToUnmute) {
            return interaction.reply("Please provide the User ID of the member to unmute.");
        }
    
        try {
            const guildMember = await interaction.guild.members.fetch(userIdToUnmute);
            const muteRole = interaction.guild.roles.cache.get(process.env.MUTE_ROLE_ID);
            const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
    
            if (!muteRole) {
                return interaction.reply("Mute role not found. Please check the role ID.");
            }
    
            if (!guildMember.roles.cache.has(process.env.MUTE_ROLE_ID)) {
                return interaction.reply("This user is not muted.");
            }
    
            await guildMember.roles.remove(muteRole);
            interaction.reply(`${guildMember.user.tag} has been unmuted.`);
    
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setColor('#00FF00')
                    .setTitle('User Unmuted')
                    .setDescription(`${guildMember.user.tag} was unmuted by ${interaction.author.tag}.`)
                    .setTimestamp();
    
                logChannel.send(logEmbed);
            }
        } catch (error) {
            console.error('Error unmuting the user:', error);
            interaction.reply("An error occurred while trying to unmute the user.");
        }
    }
}