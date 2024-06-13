const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Discord bot started, logged in as ${client.user.tag}`);
        client.user.setPresence({ 
            activities: [{ 
                name: 'some haxor stuff', 
                type: ActivityType.Watching, 
            }], 
            status: 'online' 
        });
    }
}