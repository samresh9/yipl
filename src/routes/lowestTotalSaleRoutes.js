const express = require("express");
const router = express.Router();
const logger = require("../log/logger");
module.exports = function (db) {
  router.get("/", (req, res, next) => {
    const format = req.query.format;
    const totalSales = db.prepare(`    SELECT
    name,
    sum(sale) total_sale
From
   countries c
    JOIN sales s ON c.id = s.product_id
group by
    c."name"
order by
    total_sale ASC LIMIT 3;`);
    totalSales.all(function (err, rows) {
      if (err) {
        logger.error("error");
        return next(err);
      }
      if (format && format === "api") {
        return res.json({ data: rows });
      }

      res.render("highestCountrySale", { data: rows, highest: false });
    });
  });
  return router;
};
