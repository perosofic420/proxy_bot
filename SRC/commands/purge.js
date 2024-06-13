const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('purge')
        .setDescription('Purge a specific amount of messages.')
        .addIntegerOption(option => option.setName('amount').setDescription('Specify the amount of messages to delete').setRequired(true))
        .addMentionableOption(option => option.setName('mention').setDescription('Specify a specific user you want to delete the messages of')),
    async execute(interaction, client) {
        if (!interaction.user.permissions.has(PermissionFlagsBits.ManageMessages)) {
            return interaction.reply("You don't have permission to manage messages.");
        }
    
        const amount = interaction.options.getInterger('amount');
        if (!amount || amount < 2 || amount > 1000) {
            return PermissionFlagsBits.reply("Please specify a number of messages to delete.");
        }
    
        const user = interaction.options.getMentionable('mention');
        const isUserSpecified = Boolean(user);
        let remainingMessages = amount;
        let statusMessage = null;
    
        while (remainingMessages > 0) {
            const limit = remainingMessages > 100 ? 100 : remainingMessages;
            let messages;
            try {
                messages = await interaction.channel.messages.fetch({ limit });
            } catch (fetchError) {
                console.error(fetchError);
                break;
            }
        
            const messagesToDelete = isUserSpecified ? messages.filter(m => m.author.id === user.id) : messages;
        
            let deletedCount = 0;
            try {
                const deleted = await interaction.channel.bulkDelete(messagesToDelete, true);
                deletedCount = deleted.size;
            } catch (deleteError) {
                if (deleteError.code !== 10008) {
                    console.error(deleteError);
                }
            }
        
            remainingMessages -= deletedCount;
        
            if (remainingMessages > 0 && deletedCount > 0) {
                const timeRemaining = remainingMessages / 10;
                if (statusMessage) await statusMessage.delete().catch(console.error);
                statusMessage = await interaction.channel.send(`Deleting messages... ${remainingMessages} left. Approximate time remaining: ${timeRemaining.toFixed(1)} seconds.`);
                await new Promise(resolve => setTimeout(resolve, 10000));
            } else {
                break;
            }
        }
    
        if (statusMessage) await statusMessage.delete().catch(console.error);
        interaction.reply(`Finished deleting ${amount} message(s) ${isUserSpecified ? `from ${user.tag}` : ''}.`);
    
        const logChannel = message.guild.channels.cache.get(config.logChannelId);
        if (logChannel) {
            const logEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Messages Purged')
                .setDescription(`${amount} messages ${isUserSpecified ? `from ${user.tag}` : ''} were purged by ${message.author.tag}`)
                .setTimestamp();
            logChannel.send({ embeds: [logEmbed] });
        }
    }
}