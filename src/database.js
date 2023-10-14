const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const logger = require("./log/logger");
const path = "./petroleum_datafinal7.db";
const axios = require("axios");

// const db = new sqlite3.Database(path, (err) => {
//   if (err) {
//     logger.error("Error creating or opening datbase");
//   } else {
//     logger.info("database connection successfull");
//   }
// });

// fs.access(path, fs.constants.F_OK, (err) => {
//   if (err) {
//     createDatabase((err) => {
//       if (err) logger.error("Error in creating file");
//       logger.info("file creation successfull");
//     });
//   } else {
//     logger.info("File exits");
//   }
// });
const createDatabase = (db, callback) => {
  try {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS petroleum_data (id INTEGER PRIMARY KEY,
      country TEXT , year INTEGER , petroleum_product TEXT , sale REAL)`);
    });
    axios
      .get(
        "https://raw.githubusercontent.com/younginnovations/internship-challenges/master/programming/petroleum-report/data.json",
      )
      .then((response) => {
        const data = response.data;
        const insertData = db.prepare(
          `INSERT INTO petroleum_data  (country , year , petroleum_product , sale)VALUES(?,?,?,?) `,
        );
        data.forEach((item) => {
          insertData.run(
            item.country,
            item.year,
            item.petroleum_product,
            item.sale,
          );
        });
        insertData.finalize();
        normaliseData(db, data);
        callback();
      });
  } catch (err) {
    callback(err);
  }
};
const normaliseData = (db, data) => {
  db.serialize(() => {
    db.run(`
    CREATE TABLE IF NOT EXISTS countries (
      id INTEGER PRIMARY KEY,
      name TEXT
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS years (
      id INTEGER PRIMARY KEY,
      year TEXT
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS petroleum_products (
      id INTEGER PRIMARY KEY,
      name TEXT
    )
  `);

    db.run(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY,
      country_id INTEGER,
      year_id INTEGER,
      product_id INTEGER,
      sale REAL
    )
  `);

    const insertYears = db.prepare("INSERT INTO years(id ,year) VALUES(?,?)");
    const insertPetroleumProducts = db.prepare(
      "INSERT INTO petroleum_products(id,name) VALUES(?,?)",
    );
    const insertCountry = db.prepare(
      "INSERT INTO countries(id, name) VALUES (?,?)",
    );
    const insertSales = db.prepare(
      "INSERT INTO sales(id , country_id,year_id,product_id,sale) VALUES(?,?,?,?,?)",
    );

    let yearSet = new Set();
    let countrySet = new Set();
    let productsSet = new Set();

    data.forEach((item) => {
      yearSet.add(item.year);
      countrySet.add(item.country);
      productsSet.add(item.petroleum_product);
    });
    const yearMap = new Map(
      [...yearSet].map((value, index) => [value, index + 1]),
    );
    const countryMap = new Map(
      [...countrySet].map((value, index) => [value, index + 1]),
    );

    const productsMap = new Map(
      [...productsSet].map((value, index) => [value, index + 1]),
    );
    yearMap.forEach((value, key) => {
      insertYears.run(value, key);
    });
    countryMap.forEach((value, key) => {
      insertCountry.run(value, key);
    });
    productsMap.forEach((value, key) => {
      insertPetroleumProducts.run(value, key);
    });

    data.forEach((item, index) => {
      const countryID = countryMap.get(item.country);
      const yearID = yearMap.get(item.year);
      const productID = productsMap.get(item.petroleum_product);
      insertSales.run(index + 1, countryID, yearID, productID, item.sale);
    });
    // let salesData = [];
    // data.forEach((item, index) => {
    //   salesData.push([
    //     index + 1,
    //     countryMap.get(item.country),
    //     yearMap.get(item.year),
    //     productsMap.get(item.petroleum_product),
    //   ]);
    // });
    // salesData.forEach((sale, index) => {
    //   insertSales.run(index + 1, sale);
    // });

    // insertCountry.finalize();
    // insertYears.finalize();
    // insertPetroleumProducts.finalize();
    //insertSales.finalize();
  });
};
module.exports = {
  createDatabase,
  normaliseData,
};
