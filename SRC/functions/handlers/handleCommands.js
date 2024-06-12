const { REST, Routes } = require('discord.js');
const fs = require('fs');

module.exports = (client) => {
    client.handleCommands = async() => {
        const commandFiles = fs.readdirSync(`./commands`);
        const {commands, commandArray} = client;
        for (const file of commandFiles) {
            const command = require(`../../commands/${file}`);
            commands.set(command.data.name, command);
            commandArray.push(command.data.toJSON());
        }
        
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
        try {
            console.log("Refreshing slash (/) commands.");
            await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: client.commandArray });
            console.log('Refreshed slash commands.');
        } catch (error) {
            console.error(error);
        }
    } 
}