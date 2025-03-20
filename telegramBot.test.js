const TelegramBot = require("./index");
const https = require("https");

jest.mock("https");

describe("TelegramBot", () => {
  let bot;
  const token = "fake-token";
  const chatId = "123";
  const text = "Test message";

  beforeEach(() => {
    jest.clearAllMocks();
    bot = new TelegramBot(token);
    // Mock log method to prevent console output
    jest.spyOn(bot, "log").mockImplementation(() => {});
  });

  describe("constructor", () => {
    it("throws an error if token is not provided", () => {
      expect(() => new TelegramBot()).toThrow("Telegram bot token is required");
    });

    it("initializes apiUrl correctly with the provided token", () => {
      expect(bot.apiUrl).toBe(`https://api.telegram.org/bot${token}`);
    });

    it("initializes logTypes correctly", () => {
      expect(bot.logTypes).toEqual(expect.arrayContaining(["info"]));
    });
  });

  describe("sendMessage", () => {
    const chatId = "123";
    const text = "Test message";

    it("throws an error if chatId or text is missing", () => {
      expect(() => bot.sendMessage(null, text)).toThrow();
      expect(() => bot.sendMessage(chatId, null)).toThrow();
    });

    it("rejects on network error", async () => {
      const mockError = new Error("Network error");

      https.get.mockImplementation(() => {
        const req = {
          on: (event, handler) => {
            if (event === "error") {
              // Simulate async error emission
              setTimeout(() => handler(mockError), 0);
            }
          },
        };
        return req;
      });

      await expect(bot.sendMessage(chatId, text)).rejects.toThrow(mockError);
    });

    it("calls https.get with the correct URL", () => {
      const expectedURL = `${
        bot.apiUrl
      }/sendMessage?chat_id=${encodeURIComponent(
        chatId
      )}&text=${encodeURIComponent(text)}`;

      https.get.mockImplementation((url, callback) => {
        const res = {
          on: jest.fn((event, handler) => {
            if (event === "data") handler(JSON.stringify({ ok: true }));
            if (event === "end") handler();
          }),
        };
        callback(res);
        return { on: jest.fn() };
      });

      bot.sendMessage(chatId, text);
      expect(https.get).toHaveBeenCalledWith(expectedURL, expect.any(Function));
    });

    it("resolves with response data on success", async () => {
      const mockData = { ok: true, result: {} };

      https.get.mockImplementation((url, callback) => {
        const res = {
          on: (event, handler) => {
            if (event === "data") handler(JSON.stringify(mockData));
            if (event === "end") handler();
          },
        };
        callback(res);
        return { on: jest.fn() };
      });

      await expect(bot.sendMessage(chatId, text)).resolves.toEqual(mockData);
    });

    it("rejects on API error response", async () => {
      const mockError = { ok: false, description: "Error" };

      https.get.mockImplementation((url, callback) => {
        const res = {
          on: (event, handler) => {
            if (event === "data") handler(JSON.stringify(mockError));
            if (event === "end") handler();
          },
        };
        callback(res);
        return { on: jest.fn() };
      });

      await expect(bot.sendMessage(chatId, text)).rejects.toEqual(mockError);
    });

    it("rejects on network error", async () => {
      const mockError = new Error("Network error");

      https.get.mockImplementation(() => {
        const req = {
          on: (event, handler) => {
            if (event === "error") handler(mockError);
          },
        };
        return req;
      });

      await expect(bot.sendMessage(chatId, text)).rejects.toThrow(mockError);
    });

    it("logs an info message when sending", () => {
      jest.spyOn(bot, "log");
      bot.sendMessage(chatId, text);
      expect(bot.log).toHaveBeenCalledWith(
        "info",
        `Sending message to chatId: ${chatId}`
      );
    });
  });
});
