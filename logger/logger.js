const { createLogger, format, transports } = require("winston");
require("express-async-errors");
require("winston-mongodb");
const config = require("config");

const service = config.get("SERVICE_NAME");

const logger = createLogger({
  level: "info",

  format: format.combine(
    format.colorize({ all: true }),
    format.simple(),
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss"
    }),
    format.errors({ stack: true }),
    format.splat()
  ),

  defaultMeta: { service },

  transports: [
    new transports.File({
      filename: `./logs/${service}-error.log`,
      level: "error"
    }),
    new transports.File({
      filename: `./logs/${service}-combined.log`
    }),
    new transports.Console({
      handleExceptions: true
    }),
    new transports.MongoDB({
      db: config.get("DB"),
      level: "info",
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    })
  ],

  exceptionHandlers: [
    new transports.File({ filename: `./logs/${service}-exception.log` }),
    new transports.MongoDB({
      db: config.get("DB"),
      level: "info",
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    })
  ],

  handleExceptions: true
});

process.on("unhandledRejection", reason => {
  logger.error("unhandledRejection :", reason);
});

// FIXME: Have to fix logging issue

module.exports = logger;
