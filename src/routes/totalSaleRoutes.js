const express = require("express");
const router = express.Router();
const logger = require("../log/logger");
module.exports = function (db) {
  router.get("/", (req, res, next) => {
    const format = req.query.format;
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
      if (format && format === "api") {
        return res.json({ data: rows });
      }
      // res.json({ data: rows });
      res.render("totalsales", { data: rows });
    });
  });
  return router;
};
