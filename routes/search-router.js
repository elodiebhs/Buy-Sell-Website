const express = require('express');
const router  = express.Router();
// const getAllProducts = require('../routes/database')

module.exports = (db) => {
  // router.get("/search", (req, res) => {
  //   getAllProducts(db, req.query)
  //   .then(data => {
  //     const currentUser = req.session.user_id;
  //     console.log("data rows: ", data.rows);
  //     const templateVars = { products: data.rows, currentUser: currentUser }
  //     res.render("search", templateVars)
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .json({ error: err.message });
  //   });
  // });
  // return router;

  
  router.get("/search", (req, res) => {

    let queryString = `SELECT * FROM products `;

    if(req.query.minPrice && req.query.maxPrice) {
      queryString += `WHERE price >= ${req.query.minPrice} AND price <= ${req.query.maxPrice}; `;
    } else if (req.query.minPrice) {
      queryString += `WHERE price >= ${req.query.minPrice}`;
    } else if (req.query.maxPrice) {
      queryString += `WHERE price <= ${req.query.maxPrice}`;
    }

    console.log("Search object", req.query);
    console.log(queryString)
    db.query(queryString)
    .then(data => {
      const currentUser = req.session.user_id;
      console.log("data rows: ", data.rows);
      const templateVars = { products: data.rows, currentUser: currentUser }
      res.render("search", templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });
  return router;
}