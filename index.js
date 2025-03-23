export class TelegramAPIError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.name = "TelegramAPIError";
    this.errorCode = errorCode;
  }
}

export class TelegramBot {
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
  async _request(method, params = {}) {
    const url = `${this.apiUrl}/${method}`;
    const formData = new URLSearchParams();

    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) formData.append(key, value);
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const json = await response.json();

      if (!json.ok) {
        throw new TelegramAPIError(json.description, json.error_code);
      }

      return json.result;
    } catch (error) {
      if (error instanceof TelegramAPIError) throw error;
      throw new Error(`Network error: ${error.message}`);
    }
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

  // ... rest of the class methods remain the same as your original code ...
}

export const Telegram = {
  Bot: TelegramBot,
  format: {
    bold: (text) => `*${text}*`,
    italic: (text) => `_${text}_`,
    code: (text) => `\`${text}\``,
    pre: (text) => `\`\`\`\n${text}\n\`\`\``,
    link: (text, url) => `[${text}](${url})`,
  },
  keyboard: {
    reply: (buttons, options = {}) => ({
      keyboard: buttons,
      resize_keyboard: options.resize,
      one_time_keyboard: options.oneTime,
    }),
    inline: (buttons) => ({
      inline_keyboard: buttons,
    }),
  },
};
