const Discord = require('discord.js');
const { google } = require('googleapis');
const config = require('../config.json');

const youtube = google.youtube({
    version: 'v3',
    auth: config.youtubeApiKey
});

const getYoutubeChannelData = async (channelId, message) => {
    try {
        const response = await youtube.channels.list({
            part: 'snippet,contentDetails,statistics',
            id: channelId
        });

        if (response.data.items.length === 0) {
            message.channel.send("YouTube channel not found.");
            return;
        }

        const channelInfo = response.data.items[0];
        const ytEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(channelInfo.snippet.title)
            .setURL(`https://www.youtube.com/channel/${channelId}`)
            .setDescription(channelInfo.snippet.description)
            .setThumbnail(channelInfo.snippet.thumbnails.high.url)
            .addField('Subscribers', channelInfo.statistics.subscriberCount, true)
            .addField('Views', channelInfo.statistics.viewCount, true)
            .addField('Videos', channelInfo.statistics.videoCount, true);

        message.channel.send(ytEmbed);
    } catch (error) {
        console.error('Error fetching YouTube channel data:', error);
        message.reply('There was an error fetching the YouTube channel data.');
    }
};

module.exports = getYoutubeChannelData;
