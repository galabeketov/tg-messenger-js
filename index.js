// index.js

const https = require("https");

class TelegramBot {
  /**
   * @param {string} token - Токен бота, выданный BotFather
   */
  constructor(token) {
    if (!token) {
      throw new Error("Telegram bot token is required");
    }
    this.token = token;
    this.apiUrl = `https://api.telegram.org/bot${this.token}`;
  }

  /**
   * Отправка сообщения в указанный чат
   * @param {string|number} chatId - ID чата или @username
   * @param {string} text - Текст сообщения
   * @returns {Promise<object>} Результат ответа от Telegram API
   */

  log(level, message) {
    const timestamp = new Date().toISOString();
    console.log(`${this.logStyles[level]} [${timestamp}] ${message}`);
  }

  sendMessage(chatId, text) {
    if (!chatId || !text) {
      throw new Error("chatId and text are required");
    }

    const url = `${this.apiUrl}/sendMessage?chat_id=${encodeURIComponent(
      chatId
    )}&text=${encodeURIComponent(text)}`;

    return new Promise((resolve, reject) => {
      https
        .get(url, (res) => {
          let data = "";

          res.on("data", (chunk) => {
            data += chunk;
          });

          res.on("end", () => {
            try {
              const jsonData = JSON.parse(data);
              if (!jsonData.ok) {
                return reject(jsonData);
              }
              resolve(jsonData);
            } catch (error) {
              reject(error);
            }
          });
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }
}

module.exports = TelegramBot;
