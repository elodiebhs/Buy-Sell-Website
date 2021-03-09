const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {
    console.log("Search:", req.query);
    // db.query(`
    // SELECT * FROM products WHERE brand = $1 AND price >= $2 AND price <= $3;
    // `, ["%"+req.query.productName+"%", ((req.query.minPrice)*100), ((req.query.maxPrice)*100)])
    // .then(data => {
    //   const templateVars = { products: data.rows, productName: req.query.productName }
    //   console.log("search results", templateVars.products)
    // })
    
    res.render("search")
  });
  return router;
}