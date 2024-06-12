const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { google } = require('googleapis');

const youtube = google.youtube({
    version: 'v3',
    auth: process.env.YOUTUBE_API_KEY
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('yt')
        .setDescription('Subscribe OR ELSE.'),
    async execute(interaction, client) {
        try {
            const response = await youtube.channels.list({
                part: 'snippet,contentDetails,statistics',
                id: process.env.YOUTUBE_CHANNEL_ID
            });

            if (response.data.items.length === 0) {
                return interaction.reply("YouTube channel not found.");
            }

            const channelInfo = response.data.items[0];
            const ytEmbed = new EmbedBuilder()
                .setColor(client.colour)
                .setTitle(channelInfo.snippet.title)
                .setURL(`https://www.youtube.com/channel/${channelId}`)
                .setDescription(channelInfo.snippet.description)
                .setThumbnail(channelInfo.snippet.thumbnails.high.url)
                .addField('Subscribers', channelInfo.statistics.subscriberCount, true)
                .addField('Views', channelInfo.statistics.viewCount, true)
                .addField('Videos', channelInfo.statistics.videoCount, true);

            await interaction.reply({ embeds: [ytEmbed] });
        } catch (error) {
            console.error('Error fetching YouTube channel data:', error);
            await interaction.reply('There was an error fetching the YouTube channel data.');
        }
    }
}