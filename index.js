const https = require("https");
const { URLSearchParams } = require("url");

class TelegramAPIError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = "TelegramAPIError";
    this.errorCode = errorCode;
  }
}

class TelegramBot {
  /**
   * @param {string} token - Telegram bot token
   * @param {object} [options] - Bot options
   * @param {boolean} [options.logging=true] - Enable logging
   * @param {function} [options.logger] - Custom logger function
   */
  constructor(token, options = {}) {
    if (!token) throw new Error("Telegram bot token is required");

    this.token = token;
    this.apiUrl = `https://api.telegram.org/bot${this.token}`;
    this.logging = {
      enabled: options.logging !== false,
      logger: options.logger || this._defaultLogger.bind(this),
    };
    this.pollingInterval = null;
  }

  /**
   * Internal request method
   * @private
   */
  _request(method, params = {}) {
    return new Promise((resolve, reject) => {
      const url = `${this.apiUrl}/${method}`;
      const data = new URLSearchParams(params).toString();

      const req = https.request(
        url,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": data.length,
          },
        },
        (res) => {
          let response = "";

          res.on("data", (chunk) => (response += chunk));
          res.on("end", () => {
            try {
              const json = JSON.parse(response);
              if (!json.ok) {
                reject(new TelegramAPIError(json.description, json.error_code));
              } else {
                resolve(json.result);
              }
            } catch (e) {
              reject(new Error(`Invalid JSON response: ${response}`));
            }
          });
        }
      );

      req.on("error", reject);
      req.write(data);
      req.end();
    });
  }

  /**
   * Default logger implementation
   * @private
   */
  _defaultLogger(level, message) {
    const timestamp = new Date().toISOString();
    const levels = ["info", "error", "warn", "debug"];
    const logLevel = levels.includes(level) ? level : "log";
    console[logLevel](`[${timestamp}] [${logLevel.toUpperCase()}] ${message}`);
  }

  /**
   * Log message using configured logger
   */
  log(level, message) {
    if (this.logging.enabled) {
      this.logging.logger(level, message);
    }
  }

  // Message Sending Methods
  sendMessage(chatId, text, options = {}) {
    const params = {
      chat_id: chatId,
      text,
      parse_mode: options.parse_mode,
      disable_web_page_preview: options.disable_web_page_preview,
      disable_notification: options.disable_notification,
    };

    if (options.reply_markup) {
      params.reply_markup = JSON.stringify(options.reply_markup);
    }

    this.log("info", `Sending message to ${chatId}`);
    return this._request("sendMessage", params);
  }

  sendPhoto(chatId, photo, options = {}) {
    return this._request("sendPhoto", {
      chat_id: chatId,
      photo,
      caption: options.caption,
      parse_mode: options.parse_mode,
    });
  }

  sendDocument(chatId, document, options = {}) {
    return this._request("sendDocument", {
      chat_id: chatId,
      document,
      caption: options.caption,
      parse_mode: options.parse_mode,
    });
  }

  // Webhook Methods
  setWebhook(url, options = {}) {
    return this._request("setWebhook", {
      url,
      max_connections: options.max_connections,
      allowed_updates: options.allowed_updates,
    });
  }

  deleteWebhook() {
    return this._request("deleteWebhook");
  }

  // Polling Methods
  startPolling(callback, interval = 3000) {
    let offset = 0;

    this.pollingInterval = setInterval(async () => {
      try {
        const updates = await this._request("getUpdates", {
          offset,
          timeout: Math.floor(interval / 1000),
        });

        for (const update of updates) {
          callback(update);
          offset = update.update_id + 1;
        }
      } catch (error) {
        this.log("error", `Polling error: ${error.message}`);
      }
    }, interval);

    this.log("info", `Started polling with ${interval}ms interval`);
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
      this.log("info", "Polling stopped");
    }
  }

  // Formatting Helpers
  static format = {
    bold: (text) => `*${text}*`,
    italic: (text) => `_${text}_`,
    code: (text) => `\`${text}\``,
    pre: (text) => `\`\`\`\n${text}\n\`\`\``,
    link: (text, url) => `[${text}](${url})`,
  };

  // Keyboard Helpers
  static keyboard = {
    reply: (buttons, options = {}) => ({
      keyboard: buttons,
      resize_keyboard: options.resize,
      one_time_keyboard: options.oneTime,
    }),
    inline: (buttons) => ({
      inline_keyboard: buttons,
    }),
  };
}

module.exports = TelegramBot;
