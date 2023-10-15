const express = require("express");
const app = express();
const {
  handle500Error,
  handleNotFound,
} = require("./middlewares/errorsHandlerMiddleware");
const logger = require("./log/logger");
const sqlite3 = require("sqlite3").verbose();
const path = "./petroleum_datafinal.db";
const { createDatabase } = require("./database");
const totalSales = require("./routes/totalSaleRoutes");
const highestTotalSaleByCountry = require("./routes/highestTotalSaleRoutes");
const lowestTotalSaleByCountry = require("./routes/lowestTotalSaleRoutes");
const yearIntervalAverage = require("./routes/yearIntervalAverageRoutes");
const PORT = process.env.PORT || 5000;
// eslint-disable-next-line no-unused-vars
const ejs = require("ejs");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

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

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/totalsales", totalSales(db));
app.use("/highestsale", highestTotalSaleByCountry(db));
app.use("/lowestsale", lowestTotalSaleByCountry(db));
app.use("/yearinterval", yearIntervalAverage(db));
app.use(handleNotFound);
app.use(handle500Error);
