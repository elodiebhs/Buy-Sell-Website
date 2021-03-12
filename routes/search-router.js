const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // Search page to filter products by price
  router.get("/search", (req, res) => {
    let queryString = `SELECT * FROM users WHERE is_admin = true; SELECT * FROM products `;

    if (req.query.minPrice && req.query.maxPrice) {
      queryString += `WHERE price >= ${req.query.minPrice} AND price <= ${req.query.maxPrice}; `;
    } else if (req.query.minPrice) {
      queryString += `WHERE price >= ${req.query.minPrice}`;
    } else if (req.query.maxPrice) {
      queryString += `WHERE price <= ${req.query.maxPrice}`;
    }

    db.query(queryString)
    .then(data => {
      const currentUser = req.session.user_id;
      const adminData = data.rows[0];
      const theProducts = data.rows.slice(1);
      const templateVars = { products: theProducts, currentUser: currentUser, admin: adminData }
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
