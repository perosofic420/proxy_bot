const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('board')
        .setDescription('See the level leaderboard.'),
    async execute(interaction, client) {
        let levelsData = {};
        if (fs.existsSync(levelsFilePath)) {
            const fileContent = fs.readFileSync(levelsFilePath, 'utf8');
            try {
                if (fileContent) {
                    levelsData = JSON.parse(fileContent);
                }
            } catch (error) {
                console.error("Error parsing JSON from levels file: ", error);
                levelsData = {};
            }
        }
        
        const sortedUsers = Object.entries(levelsData).sort((a, b) => {
            return b[1].level - a[1].level || b[1].points - a[1].points;
        });
    
        if (sortedUsers.length === 0) {
            return interaction.reply("The leaderboard is currently empty.");
        }
    
        const embed = new EmbedBuilder()
            .setTitle('Leaderboard')
            .setColor(client.colour)
            .setDescription('Top users by level and points');
    
        for (const [userId, data] of sortedUsers.slice(0, 10)) {
            try {
                const user = await client.users.fetch(userId);
                embed.addField(`${user.username}`, `Level: ${data.level}, Points: ${data.points}`);
            } catch (error) {
                console.error(`Failed to fetch user data for ID ${userId}: `, error);
                embed.addField(`User ID: ${userId}`, `Level: ${data.level}, Points: ${data.points}`);
            }
        }
    
        await interaction.reply({ embeds: [embed] });
    }
}