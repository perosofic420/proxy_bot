const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('cat'),   
    async execute(interaction, client) {
        try {
            const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
                headers: {
                    'x-api-key': config.catApiKey
                }
            });
            const catImageUrl = response.data[0].url;
            const catEmbed = new EmbedBuilder()
                .setColor(client.colour)
                .setTitle('Cat')
                .setImage(catImageUrl);

            await interaction.reply({ embeds: [catEmbed] });
        } catch (error) {
            console.error('Error fetching cat image:', error);
            await interaction.reply('Unable to fetch a cat image at the moment.');
        }
    }
}