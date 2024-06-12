const fs = require('fs');
const path = require('path');

//i just yoinked this, could defo be improved tho
const levelsFilePath = path.join(__dirname, '../../data/levels.json');

let levelsData = {};
if (fs.existsSync(levelsFilePath)) {
    const fileContent = fs.readFileSync(levelsFilePath, 'utf8');
    try {
        if (fileContent) {
            levelsData = JSON.parse(fileContent);
        }
    } catch (error) {
        console.error("Error parsing JSON from levels file: ", error);
        levelsData = {};
    }
}

const handleLevelingSystem = (message, levelsData, levelsFilePath) => {
    const userId = message.author.id;

    if (!levelsData[userId]) {
        levelsData[userId] = { level: 1, points: 0 };
    }

    levelsData[userId].points++;

    const pointsToNextLevel = 100 * levelsData[userId].level;
    
    if (levelsData[userId].points >= pointsToNextLevel) {
        levelsData[userId].level++;
        levelsData[userId].points = 0;
        message.channel.send(`Congratulations ${message.author}, you've reached level ${levelsData[userId].level}! 🎉`);
    }

    try {
        fs.writeFileSync(levelsFilePath, JSON.stringify(levelsData, null, 2));
    } catch (error) {
        console.error("Error writing to levels file: ", error);
    }
};

module.exports = {
    name: 'messageCreate',
    once: false,
    async execute(message, client) {
        if (message.author.bot) { return; }        
        handleLevelingSystem(message, levelsData, levelsFilePath);
    }
}