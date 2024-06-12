const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Discord bot started, logged in as ${client.user.tag}`);
        client.user.setPresence({ 
            activities: [{ 
                name: 'over unixx.shop', 
                type: ActivityType.Watching, 
                url: 'https://unixx.shop' 
            }], 
            status: 'online' 
        });
    }
}