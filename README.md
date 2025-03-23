tg-messenger-js
A Powerful and Lightweight Telegram Bot API Client for Node.js and Browsers

npm version
npm downloads
License
Node.js Version

tg-messenger-js is a modern, lightweight, and feature-rich library for interacting with the Telegram Bot API. It supports both Node.js and browser environments, making it versatile for various use cases.

Features
📨 Message Sending: Send text, photos, documents, and more.

⌨️ Custom Keyboards: Create inline and reply keyboards with ease.

🔔 Webhook Support: Set up and manage webhooks effortlessly.

📊 Polling: Built-in polling for updates.

📝 Formatting: MarkdownV2 and HTML formatting helpers.

🌐 Universal: Works in Node.js and browser environments.

🔒 Secure: Built-in warnings for client-side usage.

Installation
Install the package using npm:

bash
Copy
npm install tg-messenger-js
Or with yarn:

bash
Copy
yarn add tg-messenger-js
Quick Start
Node.js Example
javascript
Copy
const { Telegram } = require("tg-messenger-js");

const bot = new Telegram.Bot("YOUR_BOT_TOKEN");

// Send a message
bot.sendMessage("CHAT_ID", "Hello from tg-messenger-js!", {
parse_mode: "MarkdownV2",
});
Browser Example (with Proxy)
javascript
Copy
import { Telegram } from "tg-messenger-js";

const bot = new Telegram.Bot("YOUR_BOT_TOKEN", {
apiUrl: "/api/telegram-proxy", // Proxy through your backend
});

bot.sendMessage("CHAT_ID", "Hello from the browser!");
API Documentation
Core Methods
new Telegram.Bot(token, options)
token: Your Telegram bot token.

options: Configuration options.

logging: Enable/disable logging (default: true).

logger: Custom logger function.

apiUrl: Custom API endpoint (useful for proxies).

sendMessage(chatId, text, options)
chatId: Unique identifier for the target chat.

text: Text of the message.

options: Additional options like parse_mode, reply_markup, etc.

sendPhoto(chatId, photo, options)
photo: Can be a URL, file path (Node.js), or File object (browser).

setWebhook(url, options)
url: HTTPS URL to send updates to.

options: Webhook configuration.

startPolling(callback, interval)
callback: Function to handle updates.

interval: Polling interval in milliseconds (default: 3000).

Formatting Helpers
javascript
Copy
const { format } = Telegram;

const message = `  ${format.bold("Important!")}
  ${format.italic("Please read this carefully.")}
  ${format.link("Visit our website", "https://example.com")}`;

bot.sendMessage("CHAT_ID", message, { parse_mode: "MarkdownV2" });
Keyboard Helpers
Reply Keyboard
javascript
Copy
const { keyboard } = Telegram;

const markup = keyboard.reply([
["Option 1", "Option 2"],
["Cancel"],
], { resize: true });

bot.sendMessage("CHAT_ID", "Choose an option:", { reply_markup: markup });
Inline Keyboard
javascript
Copy
const markup = keyboard.inline([
[{ text: "Visit Website", url: "https://example.com" }],
[{ text: "Callback", callback_data: "data" }],
]);

bot.sendMessage("CHAT_ID", "Inline keyboard:", { reply_markup: markup });
Security Best Practices
For Browser Usage
Never expose your bot token in client-side code.

Use a proxy server to forward requests to the Telegram API.

Implement authentication and rate limiting on your proxy.

Example Proxy Setup (Node.js)
javascript
Copy
const express = require("express");
const { Telegram } = require("tg-messenger-js");

const app = express();
const bot = new Telegram.Bot("YOUR_BOT_TOKEN");

app.use(express.json());

app.post("/api/telegram-proxy/:method", async (req, res) => {
try {
const result = await bot.\_request(req.params.method, req.body);
res.json(result);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.listen(3000, () => console.log("Proxy server running on port 3000"));
Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix.

Submit a pull request.

License
MIT License © 2025 Beketov Galimjan

Resources
📚 GitHub Repository

📦 npm Package

📄 Telegram Bot API Documentation
