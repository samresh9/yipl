const { createLogger, format, transports } = require("winston");
const { combine, timestamp, prettyPrint } = format;
const logger = createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.File({ filename: "./log/combined.log" })],
});

module.exports = logger;
