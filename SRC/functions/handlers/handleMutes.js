module.exports = (client) => {
    client.handleMutes = async () => {
        setInterval(async () => {
            const mutedFilePath = path.join(__dirname, 'data', 'muted.json');
            let mutedUsers = {};

            if (fs.existsSync(mutedFilePath)) {
                mutedUsers = JSON.parse(fs.readFileSync(mutedFilePath, 'utf8'));
            }

            for (const userId in mutedUsers) {
                const user = mutedUsers[userId];
                if (user.unmuteAt && user.unmuteAt < Date.now()) {
                    const guildMember = client.guilds.cache
                        .map(guild => guild.member(userId))
                        .find(member => member);
                    
                    if (guildMember) {
                        const muteRole = guildMember.guild.roles.cache.get(process.env.MUTE_ROLE_ID);
                        if (muteRole) {
                            await guildMember.roles.remove(muteRole);
        
                            const logChannel = guildMember.guild.channels.cache.get(process.env.LOG_CHANNEL_ID);
                            if (logChannel) {
                                const logEmbed = new Discord.MessageEmbed()
                                    .setColor('#00FF00')
                                    .setTitle('User Unmuted')
                                    .setDescription(`${guildMember.user.tag} was automatically unmuted after the mute duration ended.`)
                                    .setTimestamp();
        
                                logChannel.send(logEmbed);
                            }
                        }
                        delete mutedUsers[userId];
                    }
                }
            }
            fs.writeFileSync(path.join(__dirname, 'data', 'muted.json'), JSON.stringify(mutedUsers, null, 2));
        }, 60000);
    }
}