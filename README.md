# TNM-Bot

## Description

TNM-Bot, crafted for community engagement and interaction, enhances the user experience in Discord servers. Developed using Node.js and the discord.js library, this bot boasts a user-friendly interface with commands for both entertainment and utility. It's an ideal addition for any Discord server aiming to boost user interaction and access information efficiently.

This repository serves as both a backup and a template. Updates incorporating the latest features will be made periodically.

## Notes

TNM-Bot is tailored for small to mid-sized servers (approximately 0-500 online members) and is optimized for use in a single server. It's designed for private, custom bots within a single server environment. Please note that this bot utilizes version 12.5.3 of `discord.js`, which is deprecated but chosen for its simplicity in not requiring intents. This version continues to function effectively, though it is an older package. The bot's current scale uses JSON files for data storage; larger-scale implementations may require a database and codebase modifications. Now, for whatever reason, if you need to secure `config.json` or any other file that holds case sensitive information then that's on you bro. God forbid your bot's token gets leaked, that's a shit show and a half; just reset the bot's token in the Discord Developer thing if shit hits the fan. Enjoy using the bot, and have fun!

## Features

- **Ping Command**: Checks the bot's response time.
- **Level Command**: Displays a user's current level and points.
- **Leaderboard Command**: Showcases the top users by level and points.
- **YouTube Command**: Retrieves and displays information about a specific YouTube channel.
- **Help Command**: Provides a list of all available commands.
- **Kick Command**: Removes a user from the server.
- **Unkick Command**: Sends an invite back to a kicked user.
- **Ban Command**: Prohibits a user from rejoining the server.
- **Unban Command**: Allows a previously banned user to rejoin the server.
- **Mute Command**: Temporarily or indefinitely mutes a user.
- **Unmute Command**: Removes the mute from a user.
- **Purge Command**: Deletes a specified number of messages or messages from a specific user.
- **Welcome Messages**: Sends a greeting to members who join the server.
- **Goodbye Messages**: Sends a farewell message when members leave the server.

## Installation

Follow these steps to install and run TNM-Bot. Basic knowledge of command line navigation and Node.js is assumed.

### Prerequisites

Before starting, ensure you have:
- [Node.js](https://nodejs.org/en/) (v12 or newer)
- npm (typically included with Node.js)

### Clone the Repository

Clone the repository to your machine:

```bash
git clone https://github.com/TNM0001/tnm-bot.git
cd tnm-bot
```

### Install Dependencies

Install the necessary dependencies:

```bash
npm install
```

This command installs `discord.js`, `googleapis`, and other dependencies listed in `package.json`.

### Setup Configuration

Configure the `config.json` file in the root directory:

```json
{
    "token": "DISCORD_BOT_TOKEN_HERE",
    "prefix": ",",
    "muteRoleId": "MUTE_ROLE_ID_HERE",
    "logChannelId": "LOG_CHANNEL_ID_HERE",
    "welcomeChannelId": "DOOR_CHANNEL_ID_HERE",
    "goodbyeChannelId": "DOOR_CHANNEL_ID_HERE"
}
```

Replace `DISCORD_BOT_TOKEN_HERE` with your Discord bot's token. [How to get a Discord bot token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token).

Replace `MUTE_ROLE_ID_HERE` with the role ID of your mute role. You'll need to create one and modify the permissions, I know it's a pain but if you want to mute then you gotta do it.

Replace `DOOR_CHANNEL_ID_HERE` with the channel ID(s) of where you want the join/leave logs to go, I made them different from each other so both logs don't go to one channel.

Replace `LOG_CHANNEL_ID_HERE` with the channel ID of where you want the logs to go. This bot will not log every little thing it does, it just makes the proper logs for commands that need it. You can gladly modify ANYTHING to your taste, run wild.

For YouTube integration, in `getYoutubeChannelData.js` and `bot.js` (line 108), replace `API_KEY_HERE` and `YOUTUBE_CHANNEL_ID_HERE` with your YouTube Data API key and channel ID, respectively. [Getting a YouTube API key](https://developers.google.com/youtube/v3/getting-started).

### Running the Bot

Start the bot with:

```bash
node bot.js
```

The bot should now be operational in your Discord server. Test it by issuing commands.

## Usage

Utilize the command prefix `,` followed by the command name:

- `,help` - Display command help.
- `,ping` - Check bot's latency.
- `,level` - Show your level.
- `,board` - Display the leaderboard.
- `,yt` - Show YouTube channel info.
- `,kick`, `,unkick`, `,ban`, `,unban`, `,mute`, `,unmute`, `,purge` - Moderation commands.

## Contributing

This project welcomes contributions under the MIT open-source license. If you wish to contribute, please contact me on Discord (`therealtnm`) or via email (`sysadmin@tnm.lol`).

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

```
MIT License

Copyright (c) 2024 NightMare

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

## Contact

- **Discord**: `therealtnm`
- **Email**: `sysadmin@tnm.lol`

# Changelogs

```
V1.2.0

-Updated README.md with new commands, info, and added changelogs instead of stupid ass commits
-Added a custom domain to this repo, I might plan on doing some cool shit with it for the bot. https://discord.tnm.lol
-Commands added: kick, unkick, ban, unban, mute, unmute, and purge.
-Added welcome/leave logs.
-Added more error handling
-Centralized required IDs in config.json, you're welcome.
-Optimized code base.
```

```
V1.1.5

-Uploaded and publicize the bot's SRC on Github.
-Commands added: help, ping, level, board, and yt.
-Refactored with modular programming.
-Added a README.md file.
-MIT open-source licensed
```
