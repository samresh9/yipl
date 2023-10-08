const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
app.get("/", (req, res) => {
  res.json({ hello: "hi" });
});
app.listen(PORT, () => {});
