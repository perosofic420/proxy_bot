const Discord = require('discord.js');
const config = require('../config.json');
const axios = require('axios');

module.exports = async (message) => {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
            headers: {
                'x-api-key': config.catApiKey
            }
        });
        const catImageUrl = response.data[0].url;
        const catEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Cat')
            .setImage(catImageUrl);
        message.channel.send(catEmbed);
    } catch (error) {
        console.error('Error fetching cat image:', error);
        message.reply('Unable to fetch a cat image at the moment.');
    }
};
