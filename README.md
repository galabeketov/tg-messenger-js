# tg-messenger-js

**🔥 Мощный и легковесный клиент для Telegram Bot API**

![npm version](https://img.shields.io/npm/v/tg-messenger-js) ![npm downloads](https://img.shields.io/npm/dm/tg-messenger-js) ![Node.js](https://img.shields.io/badge/node-%3E%3D14-brightgreen) ![License](https://img.shields.io/github/license/your-repo/tg-messenger-js)

## 🚀 Основные возможности

- 📨 **Отправка сообщений** — текст, фото, документы и многое другое
- ⌘ **Кастомные клавиатуры** — inline и reply клавиатуры
- 🔔 **Вебхуки** — настройка и управление
- 📊 **Поллинг обновлений** — автоматический опрос сервера
- 📝 **Форматирование** — поддержка MarkdownV2 и HTML
- 🌐 **Кроссплатформенность** — работает в Node.js и браузерах

---

## 📦 Установка

Установите пакет через npm или yarn:

```sh
npm install tg-messenger-js
# или
yarn add tg-messenger-js
```

---

## ⚡ Быстрый старт

### 📩 Отправка сообщения

```js
const { Telegram } = require("tg-messenger-js");

const bot = new Telegram.Bot("YOUR_BOT_TOKEN");

bot.sendMessage("CHAT_ID", "Привет от tg-messenger-js!", {
  parse_mode: "MarkdownV2",
});
```

### 🖼 Отправка фото с inline-клавиатурой

```js
const { Telegram } = require("tg-messenger-js");

const bot = new Telegram.Bot("YOUR_BOT_TOKEN");
const { keyboard } = Telegram;

const markup = keyboard.inline([
  [{ text: "🔗 Открыть сайт", url: "https://example.com" }],
]);

bot.sendPhoto("CHAT_ID", "photo.jpg", {
  caption: "Выберите действие:",
  reply_markup: markup,
});
```

### 🌍 Работа с вебхуками

```js
const express = require("express");
const { Telegram } = require("tg-messenger-js");

const app = express();
const bot = new Telegram.Bot("YOUR_BOT_TOKEN");

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const update = req.body;
  // Логика обработки обновления
  res.sendStatus(200);
});

// Настройка вебхука
bot.setWebhook("https://your-domain.com/webhook");
```

---

## 📚 API документация
