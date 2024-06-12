const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription('Check your level.'),
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
        const userId = message.author.id;
        if (!levelsData[userId]) {
            const levelEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Level Status')
                .setDescription("You do not have any level data yet. Keep participating to start leveling up!");
            message.channel.send(levelEmbed);
            return;
        }
        const userLevelData = levelsData[userId];
        const levelEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Your Level Information')
            .setDescription(`You are currently at level ${userLevelData.level} with ${userLevelData.points} points.`);
        interaction.reply({ embeds: [levelEmbed] });
    }
}