const express = require("express");
const router = express.Router();
const logger = require("../log/logger");
module.exports = function (db) {
  router.get("/", (req, res, next) => {
    const format = req.query.format;
    const yearIntervalAverage = db.prepare(`  SELECT
    name,
    '2007-2010' as YEAR,
    AVG(sale) as AVG
FROM
    sales s
    JOIN years y ON s.year_id = y.id
    JOIN petroleum_products pp ON s.product_id = pp.id
where
    s.sale > 0
    AND (
        year >= 2007
        AND year <= 2010
    )
GROUP BY
    1
    UNION
    SELECT
    name,
    '2011-2014' as YEAR,
    AVG(sale) as AVG
FROM
    sales s
    JOIN years y ON s.year_id = y.id
    JOIN petroleum_products pp ON s.product_id = pp.id
where
    s.sale > 0
    AND (
        year >= 2011
        AND year <= 2014
    )
GROUP BY
    1
    ; `);
    yearIntervalAverage.all(function (err, rows) {
      if (err) {
        logger.error("error");
        return next(err);
      }
      if (format && format === "api") {
        return res.json({ data: rows });
      }

      res.render("yearIntervalAvg", { data: rows });
    });
  });
  return router;
};
