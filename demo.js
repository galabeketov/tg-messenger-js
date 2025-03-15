// demo.js
const TelegramBot = require("./index"); // Локальное подключение

const bot = new TelegramBot("YOUR_BOT_TOKEN");
bot
  .sendMessage("CHAT_ID", "Привет из tg-messenger-js!")
  .then((response) => {
    console.log("Сообщение отправлено:", response);
  })
  .catch((error) => {
    console.error("Ошибка при отправке сообщения:", error);
  });
