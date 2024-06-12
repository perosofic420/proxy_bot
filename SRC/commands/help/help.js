const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display a list of commands.'),
    async execute(interaction, client) {
		var cmdList = "";
        for (cmd of client.commandArray) {
			cmdList += `**/${cmd.name}`;
			if (cmd.options) {
				for (opt of cmd.options) {
					cmdList += ` [${opt.name}]`;
				}
			}
			cmdList += `** - ${cmd.description}\n`;
        }

        var _embed = new EmbedBuilder();
        _embed.setColor(client.colour);
        _embed.setTimestamp();
		_embed.setTitle("Bot | Help");
		_embed.setDescription(cmdList);

		await interaction.reply({ embeds: [_embed] });
    }
}