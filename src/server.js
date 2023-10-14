const express = require("express");
const app = express();
const {
  handle500Error,
  handleNotFound,
} = require("./log/middlewares/errorsHandlerMiddleware");
const logger = require("./log/logger");
const sqlite3 = require("sqlite3").verbose();
const path = "./petroleum_datafinal7.db";
const { createDatabase } = require("./database");
const PORT = process.env.PORT || 5000;

app.get("/", (req, res, next) => {
  logger.info("hi");
  const totalSales = db.prepare(`SELECT
    name,
    sum(sale) total_sale
From
    petroleum_products pp
    JOIN sales s ON pp.id = s.product_id
group by
    pp."name"
order by
    total_sale DESC;`);
  totalSales.all(function (err, rows) {
    if (err) {
      logger.error("error");
      return next(err);
    }
    res.json({ data: rows });
  });
});
app.use(handleNotFound);
app.use(handle500Error);
const db = new sqlite3.Database(path, (err) => {
  if (!err) {
    logger.info("database connection successfull");
    db.get(`SELECT * from countries limit 1 `, (err, row) => {
      logger.error("error from row check", err);
      if (!err && row) {
        logger.info("table exist");
        app.listen(PORT, () => {
          logger.info(`server running at http://localhost:${PORT}`);
        });
      } else {
        logger.info("Creating new tables in db");
        createDatabase(db, (err) => {
          if (err) {
            logger.error("Error in creating file");
          } else {
            logger.info("file creation successfull");
            app.listen(PORT, () => {
              logger.info(`server running at http://localhost:${PORT}`);
            });
          }
        });
      }
    });
  } else {
    logger.error("Error creating or opening datbase");
  }
});
