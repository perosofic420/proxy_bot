const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(member, client) {
        const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
        if (!channel) return;
        const welcomeEmbed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('Welcome!')
            .setDescription(`${member} has joined the server. Welcome!`)
            .setTimestamp();
        channel.send({ embeds: [welcomeEmbed] });
    }
}