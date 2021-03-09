const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    console.log("Search object", req.query);
    db.query(`SELECT * FROM products WHERE price >= ${req.query.minPrice} AND price <= ${req.query.maxPrice};`)
    .then(data => {
      console.log("data rows: ", data.rows);
      const templateVars = { products: data.rows }
      res.render("search", templateVars)
    })
  });
  return router;
}