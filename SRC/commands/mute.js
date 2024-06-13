const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

function parseDuration(amount, type) {
    const types = { s: 1000, m: 60000, h: 3600000, d: 86400000 };
    return amount * types[type];
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute someone in the server.')
        .addMentionableOption(option => option.setName('mention').setDescription('Mention someone to mute')),
    async execute(interaction, client) {
        const mutedFilePath = path.join(__dirname, '../data/muted.json');
        let mutedUsers = {};
        
        if (fs.existsSync(mutedFilePath)) {
            mutedUsers = JSON.parse(fs.readFileSync(mutedFilePath, 'utf8'));
        }
    
        if (!interaction.user.permissions.has(PermissionFlagsBits.ModerateMembers)) {
            return interaction.reply("You don't have permission to timeout members.");
        }
    
        const userToMute = interaction.options.getMentionable('mention');
        if (!userToMute) {
            return interaction.reply("Please mention a user to mute.");
        }
    
        const reason = args.slice(2).join(" ") || "No reason provided";
        const durationMatch = args[1] ? args[1].match(/^(\d+)(s|m|h|d)$/) : null;
        const duration = durationMatch ? parseDuration(durationMatch[1], durationMatch[2]) : null;
    
        const guildMember = interaction.guild.members.resolve(userToMute);
        if (!guildMember) {
            return interaction.reply("That user is not in this guild.");
        }
    
        const muteRole = interaction.guild.roles.cache.get(process.env.MUTE_ROLE_ID);
        if (!muteRole) {
            return interaction.reply("Mute role not found. Please check the role ID.");
        }
    
        try {
            await guildMember.roles.add(muteRole);
            await interaction.reply(`${userToMute.tag} has been muted${duration ? ` for ${args[1]}` : ''}`);
    
            mutedUsers[userToMute.id] = { 
                unmuteAt: duration ? Date.now() + duration : null 
            };
            fs.writeFileSync(mutedFilePath, JSON.stringify(mutedUsers, null, 2));
    
            const logChannel = interaction.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
            if (logChannel) {
                const logEmbed = new EmbedBuilder()
                    .setColor('#808080')
                    .setTitle('User Muted')
                    .setDescription(`${userToMute.tag} has been muted.`)
                    .addField('Muted By', interaction.author.tag)
                    .addField('Reason', reason)
                    .addField('Duration', duration ? args[1] : 'Indefinitely')
                    .setTimestamp();
    
                logChannel.send({ embeds: [logEmbed] });
            } else {
                console.error('Log channel not found');
            }
        } catch (error) {
            console.error('Error muting the user:', error);
            interaction.reply("An error occurred while trying to mute the user.");
        }
    }
}