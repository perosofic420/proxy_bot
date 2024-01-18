const Discord = require('discord.js');

const displayLeaderboard = async (client, message, levelsData) => {
    const sortedUsers = Object.entries(levelsData).sort((a, b) => {
        return b[1].level - a[1].level || b[1].points - a[1].points;
    });

    if (sortedUsers.length === 0) {
        message.channel.send("The leaderboard is currently empty.");
        return;
    }

    const embed = new Discord.MessageEmbed()
        .setTitle('Leaderboard')
        .setColor('#0099ff')
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

    message.channel.send(embed).catch(console.error);
};

module.exports = displayLeaderboard;
