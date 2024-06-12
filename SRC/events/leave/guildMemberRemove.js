const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberRemove',
    once: false,
    async execute(member, client) {
        const channel = member.guild.channels.cache.get(process.env.GOODBYE_CHANNEL_ID);
        if (!channel) return;
        const goodbyeEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle('Goodbye!')
            .setDescription(`${member.displayName} has left the server.`)
            .setTimestamp();
        channel.send({ embeds: [goodbyeEmbed] });
    }
}