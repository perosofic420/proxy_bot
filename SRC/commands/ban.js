const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display a list of commands.')
        .addMentionableOption(option => option.setName('@user').setDescription('Mention someone')),
    async execute(interaction, client) {
        if (!interaction.user.hasPermission('BAN_MEMBERS')) {
            return interaction.reply("You don't have permission to ban members.");
        }
    
        const userToBan = interaction.message.mentions.users.first();
        if (!userToBan) {
            return interaction.reply("Please mention a user to ban.");
        }
    
        const reason = args.slice(1).join(" ") || "No reason provided";
    
        if (!interaction.guild.members.resolve(userToBan)) {
            return interaction.reply("That user is not in this guild.");
        }
    
        try {
            await interaction.guild.members.ban(userToBan, { reason });
            await interaction.reply(`Successfully banned ${userToBan.tag} for: ${reason}`);
    
            const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('User Banned')
                    .setDescription(`${userToBan.tag} has been banned.`)
                    .addField('Banned By', message.author.tag)
                    .addField('Reason', reason)
                    .setTimestamp();
    
                logChannel.send({ embeds: [logEmbed] });
            } else {
                console.error('Log channel not found');
            }
        } catch (error) {
            console.error(error);
            interaction.reply("An error occurred while trying to ban the user.");
        }
    }
}