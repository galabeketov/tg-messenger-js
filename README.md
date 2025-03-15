# tg-messenger-js

A lightweight package for sending messages via the Telegram Bot API.

## Installation

Install the package via npm:

```sh
npm install tg-messenger-js
```

or via yarn:

```sh
yarn add tg-messenger-js
```

## Usage

### Importing the module

```js
const TelegramBot = require("tg-messenger-js");
```

### Creating a bot instance

Create an instance of the bot using your Telegram Bot API token:

```js
const bot = new TelegramBot("YOUR_BOT_TOKEN");
```

### Sending a message

To send a message to a chat, use the `sendMessage` method:

```js
bot
  .sendMessage("CHAT_ID", "Hello from tg-messenger-js!")
  .then((response) => {
    console.log("Message sent successfully:", response);
  })
  .catch((error) => {
    console.error("Error sending message:", error);
  });
```

## Parameters

- `YOUR_BOT_TOKEN` – Your bot token, obtained from [BotFather](https://t.me/BotFather).
- `CHAT_ID` – The ID of the chat where the message should be sent. It can be a user ID, group ID, or `@username`.
- `text` – The message text.

## Example

```js
const TelegramBot = require("tg-messenger-js");
const bot = new TelegramBot("123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZ");

bot
  .sendMessage(123456789, "Hello, world!")
  .then((response) => console.log("Message sent:", response))
  .catch((error) => console.error("Failed to send message:", error));
```

## License

MIT License

Copyright (c) 2025 [Beketov Galimjan]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
