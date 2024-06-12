module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        if (!message.content.startsWith("/") || message.author.bot) { return; }
        if (message.author.id != 884532532857683990 && message.author.id != 856639315743604807) { return; }

        var commandName = message.content.split(' ')[0].split('/')[1];
        var args = message.content.split(' ').slice(1);

        const { adminCommands } = client;

        const command = adminCommands.get(commandName);
        if (!command) return;

        try {
            await command.execute(message, client, args);
        } catch (error) {
            console.error(error);
            await interaction.reply({content: `An issue occurred executing this command.`, ephemeral: true });
        }
    }
}