# TNM-Bot

## Description

TNM-Bot, crafted for community engagement and interaction, enhances the user experience in Discord servers. Developed using Node.js and the discord.js library, this bot boasts a user-friendly interface with commands for both entertainment and utility. It's an ideal addition for any Discord server aiming to boost user interaction and access information efficiently.

This repository serves as both a backup and a template. Updates incorporating the latest features will be made periodically.

## Notes

TNM-Bot is tailored for small to mid-sized servers (approximately 0-500 online members) and is optimized for use in a single server. It's designed for private, custom bots within a single server environment. Please note that this bot utilizes version 12.5.3 of `discord.js`, which is deprecated but chosen for its simplicity in not requiring intents. This version continues to function effectively, though it is an older package. The bot's current scale uses JSON files for data storage; larger-scale implementations may require a database and codebase modifications. Now, for whatever reason, if you need to secure `config.json` or any other file that holds case sensitive information then that's on you bro. God forbid your bot's token gets leaked, that's a shit show and a half; just reset the bot's token in the Discord Developer thing if shit hits the fan. Enjoy using the bot, and have fun!

## Features

- **Ping Command**: Checks the bot's latency.
- **Level Command**: Shows a user's level and points.
- **Leaderboard Command**: Displays top users by level and points.
- **YouTube Command**: Fetches information about a specified YouTube channel.
- **Cat Command**: Displays a random cat image.
- **Help Command**: Lists all available commands and provides detailed usage for each.
- **Kick/Unkick Commands**: Remove/add a user from/to the server.
- **Ban/Unban Commands**: Prevent/allow a user from rejoining the server.
- **Mute/Unmute Commands**: Temporarily or indefinitely silence a user.
- **Purge Command**: Deletes a specified number of messages or specific user's messages.
- **Welcome/Goodbye Messages**: Sends automated messages for joining/leaving members.
- **Config Command**: Configures bot settings like mute role, log channel, API keys, etc.

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

This command installs `discord.js`, `googleapis`, and `axios` listed in `package.json`.

### Setup Configuration

- When you run the bot for the first time, it'll ask you for a Discord bot token. Once you input the token into the CLI, it'll start the bot. Then you can use the `,config` command to set up the rest of the configuration. This way, there's no need to touch the codebase resulting in a better user experience. [How to get a Discord bot token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token).

- Now for configuration, you can use the config command to modify the `config.json` file for the following: prefix, log channel, mute role, welcome/goodbye channel, YouTube API key and channel ID, and The Cat API key.

- Input the command `,config muterole MUTE_ROLE_ID_HERE` with the role ID of your mute role. You'll need to create one and modify the permissions, I know it's a pain but if you want to mute then you gotta do it.

- Input the command `,config welcomechannel DOOR_CHANNEL_ID_HERE` or `,config goodbyechannel DOOR_CHANNEL_ID_HERE` with the channel ID(s) of where you want the join/leave logs to go, I made them different from each other so both logs don't go to one channel.

- Input the command `,config logchannel LOG_CHANNEL_ID_HERE` with the channel ID of where you want the logs to go. This bot will not log every little thing it does, it just makes the proper logs for commands that need it.

- For YouTube integration, input the command `,config youtubeapikey API_KEY_HERE` with a YouTube API key and use the command `,config youtubechannelid YOUTUBE_CHANNEL_ID_HERE` to fetch a channel's data. [Getting a YouTube API key](https://developers.google.com/youtube/v3/getting-started).

- Input the command `,config catapikey CAT_API_KEY_HERE` with your API key from TheCatAPI for the cat command. [Getting a Cat API key](https://thecatapi.com/signup).

### Running the Bot

Start the bot with:

```bash
node bot.js
```

The bot should now be operational in your Discord server. Test it by issuing commands.

## Usage

Utilize the command prefix `,` followed by the command name:

- `,help` - Display command help. Specific command details can be obtained by `,help [command]`.
- `,ping` - Check the bot's latency.
- `,level` - Show your level in the server's leveling system.
- `,board` - Display the leaderboard of top users based on levels and points.
- `,yt` - Show information about a specific YouTube channel.
- `,cat` - Fetch and display a random cat image.
- `,config` - Configure bot settings like prefixes and channel IDs (requires admin permissions).
- Moderation Commands:
  - `,kick @user [reason]` - Kicks a user from the server.
  - `,unkick userID` - Invites a previously kicked user back to the server.
  - `,ban @user [reason]` - Bans a user from the server.
  - `,unban userID` - Unbans a user from the server.
  - `,mute @user [duration]` - Mutes a user for a specified duration or indefinitely.
  - `,unmute userID` - Unmutes a user.
  - `,purge number` or `,purge @user number` - Deletes a specified number of messages or messages from a specific user.

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
V1.2.5

- Updated README.md with new commands, info, and added new changelogs instead of stupid ass commits.
- Commands added: cat
- Implemented the 'config' command for easy bot configuration. A rework of the configuration system.
- Implemented the ability to change bot settings via commands.
- Centralized everything that requires values in `config.json`
- Added more error handling.
- Optimized code base.
- Enhanced the 'displayHelp' command for detailed command usage.
```

```
V1.2.0

-Updated README.md with new commands, info, and added changelogs instead of stupid ass commits.
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
