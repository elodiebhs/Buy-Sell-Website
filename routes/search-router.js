const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/search", (req, res) => {

    const queryString = `SELECT * FROM products WHERE price >= ${req.query.minPrice} AND price <= ${req.query.maxPrice};`

    console.log("Search object", req.query);
    // const queryParams = [];
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