# tg-messenger-js

Advanced Telegram Bot API wrapper for Node.js with rich features and flexible configuration.

## Features

- Send text messages with formatting
- Send photos/documents from URLs
- Create reply/inline keyboards
- Formatting helpers for Markdown
- Webhook configuration
- Update polling
- Custom logging
- Detailed error handling

## Installation

```bash
npm install tg-messenger-js



const TelegramBot = require("tg-messenger-js");
const bot = new TelegramBot("YOUR_BOT_TOKEN");

// Simple message
bot.sendMessage("CHAT_ID", "Hello World!")
  .then(console.log)
  .catch(console.error);


// Using Markdown formatting
const text = TelegramBot.format.bold("Important!") + " message";
bot.sendMessage("CHAT_ID", text, { parse_mode: "MarkdownV2" });

// Using HTML formatting
bot.sendMessage("CHAT_ID", "<b>Bold</b> text", { parse_mode: "HTML" });




// Using Markdown formatting
const text = TelegramBot.format.bold("Important!") + " message";
bot.sendMessage("CHAT_ID", text, { parse_mode: "MarkdownV2" });

// Using HTML formatting
bot.sendMessage("CHAT_ID", "<b>Bold</b> text", { parse_mode: "HTML" });


bot.sendPhoto("CHAT_ID", "https://example.com/photo.jpg", {
  caption: "Beautiful scenery",
  parse_mode: "MarkdownV2"
});



// Reply keyboard
const replyMarkup = TelegramBot.keyboard.reply([
  [{ text: "Yes" }, { text: "No" }]
], { resize: true });

// Inline keyboard
const inlineMarkup = TelegramBot.keyboard.inline([
  [{ text: "Visit", url: "https://example.com" }]
]);

bot.sendMessage("CHAT_ID", "Choose option:", { reply_markup: inlineMarkup });



bot.setWebhook("https://your-domain.com/webhook", {
  max_connections: 40
});



bot.startPolling((update) => {
  console.log("Received update:", update);
}, 5000); // Check every 5 seconds

// To stop polling later
bot.stopPolling();



bot.startPolling((update) => {
  console.log("Received update:", update);
}, 5000); // Check every 5 seconds

// To stop polling later
bot.stopPolling();



const bot = new TelegramBot("TOKEN", {
  logging: true, // Enable/disable logs
  logger: (level, message) => {
    // Implement custom logging
  }
});



API Reference
Core Methods
sendMessage(chatId, text, options)

sendPhoto(chatId, photo, options)

sendDocument(chatId, document, options)

setWebhook(url, options)

deleteWebhook()

startPolling(callback, interval)

stopPolling()

Format Helpers
format.bold(text)

format.italic(text)

format.code(text)

format.pre(text)

format.link(text, url)

Keyboard Helpers
keyboard.reply(buttons, options)

keyboard.inline(buttons)


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
```
