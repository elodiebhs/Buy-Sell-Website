const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    console.log("Search objects", req.query)
    db.query(`SELECT * FROM products WHERE brand ILIKE $1 AND size LIKE $2 AND price >= $3 AND price <= $4;`,["%"+req.query.productBrand+"%", ((req.query.minPrice)*100), ((req.query.maxPrice)*100)] )
    res.render("search")
  });
  return router;
}