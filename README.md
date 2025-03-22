# tg-messenger-js

**Мощный клиент для Telegram Bot API**

![npm version](https://img.shields.io/npm/v/tg-messenger-js) ![npm downloads](https://img.shields.io/npm/dm/tg-messenger-js)

## Основные возможности

- 📨 Отправка текстовых сообщений
- 🖼️ Отправка фото и документов
- ⌨️ Создание кастомных клавиатур
- 🔔 Настройка вебхуков
- 📊 Поллинг обновлений
- 📝 Форматирование Markdown/HTML

## Быстрый старт

Установите пакет с помощью npm:

```sh
npm install tg-messenger-js
```

## Примеры использования

### Отправка сообщения

```js
const TelegramBot = require("tg-messenger-js");
const bot = new TelegramBot("YOUR_BOT_TOKEN");

bot.sendMessage("@channel_name", "Привет от tg-messenger-js!", {
  parse_mode: "MarkdownV2",
  disable_notification: true,
});
```

### Отправка фото с клавиатурой

```js
const { keyboard } = TelegramBot;

const markup = keyboard.inline([
  [{ text: "Открыть сайт", url: "https://example.com" }],
]);

bot.sendPhoto("CHAT_ID", "photo.jpg", {
  caption: "Выберите действие:",
  reply_markup: markup,
});
```

### Работа с вебхуками

```js
// Настройка вебхука
bot.setWebhook("https://your-domain.com/webhook", {
  max_connections: 40,
});

// Обработка обновлений
app.post("/webhook", async (req, res) => {
  const update = req.body;
  // Ваша логика обработки
});
```

## Документация

### Основные методы

- `sendMessage()`
- `sendPhoto()`
- `sendDocument()`
- `setWebhook()`

### Форматирование

- `format.bold()`
- `format.italic()`
- `format.link()`

### Клавиатуры

- `keyboard.reply()`
- `keyboard.inline()`

## Ресурсы

- 📚 [GitHub репозиторий](https://github.com/your-repo)
- 📦 [npm пакет](https://www.npmjs.com/package/tg-messenger-js)
- 📄 [Официальная документация API](https://core.telegram.org/bots/api)

---

MIT License © 2025 Beketov Galimjan
