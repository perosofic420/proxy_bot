const fs = require('fs');
const path = require('path');

const handleLevelingSystem = (message, levelsData, levelsFilePath) => {
    const userId = message.author.id;

    if (!levelsData[userId]) {
        levelsData[userId] = { level: 1, points: 0 };
    }

    levelsData[userId].points++;

    const pointsToNextLevel = 100 * levelsData[userId].level; //You can change the forumla to determine how fast users level up, remember, the number you put here doubles every level
    
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

module.exports = handleLevelingSystem;
