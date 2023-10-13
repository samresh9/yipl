const express = require("express");
const app = express();
const logger = require("./log/logger");
const PORT = process.env.PORT || 9000;
app.get("/", (req, res) => {
  logger.info("hi");
  res.json({ hello: "hi" });
});
app.listen(PORT, () => {});
