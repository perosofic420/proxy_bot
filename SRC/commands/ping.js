const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Pingy Pingy.'),
    async execute(interaction, client) {
        const timeTaken = Date.now() - interaction.createdTimestamp;
        
        await interaction.deferReply({
            fetchReply: true
        });

        const _embed = new EmbedBuilder()
            .setColor(client.colour)
            .setTitle('Ping Response')
            .setDescription(`Pong! This message had a latency of ${timeTaken}ms.`);

		await interaction.editReply({ embeds: [_embed] });
    }
}